import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommandsService } from 'src/app/services/commands.service';
import { stateCommande, toastShow } from 'src/app/shared/shared';

@Component({
  selector: 'app-handle-command',
  templateUrl: './handle-command.component.html',
  styleUrls: ['./handle-command.component.css']
})
export class HandleCommandComponent implements OnInit {
  commands!: any[];
  command!: any;
  articles!: any[];
  anonUser!: any;
  formCommand!: FormGroup;
  amtDelevery !: number;
  statcmd!: any[];
  cmdFiltering!: string;
  currentPage: number = 1;
  p: number = 1;
  clicked: boolean = false;

  constructor(private commandService: CommandsService) { }



  ngOnInit(): void {
    // setTimeout(() => { this.ngOnInit() }, 1000 * 10)
    this.statcmd = stateCommande
    this.commandService.getCommands().subscribe({
      next: (res: any) => {
        this.commands = res
      }
    })
  }

  editCommande(item: any) {
    this.command = item
    if (item?.commandProducts) {
      this.articles = JSON.parse(item?.commandProducts)
      // this.articles = this.convetToJson(item?.commandProducts)
      this.amtDelevery = item.priceDelivery
    }
    if (item?.infoAnonUser) {
      this.anonUser = JSON.parse(item?.infoAnonUser)
      // this.anonUser = this.convetToJson(item?.infoAnonUser)
    }
  }

  submitPrice(command: any) {
    let data = {
      'amount': this.amtDelevery,
      'setAmout': true
    }
    this.commandService.sendAmtDelevery((command?.nberInvoice), data).subscribe(res => {
      this.commands = this.commands.filter((obj: any) => obj !== this.command)
      toastShow('success', 'Email envoyé avec succès au client')
      this.clicked = false;
      this.commands?.unshift(res)
      document.getElementById('btnClose01')?.click()
    })
  }

  changeState(e: any, item: number) {
    let data = {
      'setAmout': false,
      'newStat': e.target.value
    }
    this.commandService.sendAmtDelevery(item, data).subscribe(res => {
      toastShow('success', 'Statut mis à jour')
    })
  }

  // ************************* to convert string to json ****************************
  convetToJson(word: any) {
    return JSON.parse(word)
  }

}
