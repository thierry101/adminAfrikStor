import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicService } from 'src/app/services/public.service';
import { showError, toastShow } from 'src/app/shared/shared';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  formBlog!: FormGroup;
  imagSrcBlog: string = 'assets/img/overview.jpeg';
  errors!: string[];
  blogs!: any[];
  idItemEdit!: any;
  edit: boolean = false;
  clicked: boolean = false;

  constructor(private fb: FormBuilder, private publicService: PublicService) { }


  ngOnInit(): void {
    // setTimeout(() => { this.ngOnInit() }, 1000 * 10)
    this.formBlog = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      article: ['', Validators.required],
      author: ['', Validators.required],
      statut: [true],
      mainIMg: [{ 'name': '', 'file': '' }, [Validators.required]],
    });

    this.publicService.getBlogs().subscribe(res => {
      this.blogs = res
    })
  }

  createNewBlog() {
    this.errors = []
    this.edit = false;
    this.formBlog.reset();
    this.imagSrcBlog = 'assets/img/overview.jpeg';
    this.formBlog.patchValue({
      statut: true
    })
  }

  submitBlog() {
    this.publicService.sendBlog(this.formBlog.getRawValue()).subscribe(res => {
      if (res) {
        toastShow('success', "Marque créée avec succès")
        this.clicked = false;
        this.imagSrcBlog = 'assets/img/overview.jpeg';
        this.blogs?.unshift(res)
        this.errors = []
        this.formBlog.reset()
        this.formBlog.patchValue({
          statut: true
        })
      }
    }, (error => {
      this.clicked = false;
      this.errors = []
      this.errors = error.error
      showError(error, error.status, this.errors, error.error)
    }))
  };

  editItem(item: any) {
    this.errors = []
    this.idItemEdit = item;
    this.edit = true
    this.imagSrcBlog = environment.API + item?.image
    this.formBlog.patchValue({
      title: item?.title,
      category: item?.category,
      article: item?.blogMsg,
      author: item?.author,
      statut: item?.statut,
    })
  };

  submitEditBlog() {
    let data = {
      'state': false,
      'data': this.formBlog.getRawValue(),
    }
    this.publicService.editBlog(this.idItemEdit?.id, data).subscribe(res => {
      this.clicked = false;
      this.imagSrcBlog = 'assets/img/overview.jpeg';
      this.edit = false;
      this.formBlog.patchValue({
        statut: true
      })
      this.blogs = this.blogs.filter((obj: any) => obj !== this.idItemEdit)
      this.blogs?.unshift(res);
      toastShow('success', "Blog mise à jour avec succès")
      this.formBlog.reset();
      this.formBlog.patchValue({
        statut: true
      })
    },
      (error => {
        this.clicked = false;
        this.errors = []
        this.errors = error.error
        showError(error, error.status, this.errors, error.error)
      })
    )
  }

  changeState(event: any, id: number) {
    let data = {
      'state': true,
      'data': event.target.checked,
    }
    this.publicService.editBlog(id, data).subscribe(res => {
      if (res) {
        toastShow('success', "Statut changé avec succès")
        this.errors = []
      }
    },
      (error => {
        this.errors = []
        this.errors = error.error
        showError(error, error.status, this.errors, error.error)
      }))
  }

  // ***************************** preview main image of product ************************************
  imagePreview(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imagSrcBlog = reader.result as string;

        this.formBlog.patchValue({
          mainIMg: { 'name': event.target.files[0]['name'], 'file': reader.result }
        });
        event.target.value = null
      };

    }
  }



}
