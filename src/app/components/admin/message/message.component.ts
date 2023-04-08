import { Component, OnInit } from '@angular/core';
import { CommandsService } from 'src/app/services/commands.service';
import { statuts, toastShow } from 'src/app/shared/shared';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messages!: any[];
  statuts!: any[];

  constructor(private commandService: CommandsService) { }

  ngOnInit(): void {
    // setTimeout(() => { this.ngOnInit() }, 1000 * 10)
    this.statuts = statuts
    this.commandService.getMessages().subscribe({
      next: (res: any) => {
        this.messages = res
      }
    })
  }

  changeStatMsg(item: any, event: any) {
    let data = {
      'newState': event.target.value,
      'state': true,
    }
    return this.commandService.sendNewState(item?.id, data).subscribe(res => {
      if (res) {
        toastShow('success', 'Statut mis à jour ')
      }
    })
  }

}
