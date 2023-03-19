import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  
  constructor(private overlay:OverlayContainer){}
  title = 'jsonCrud';
  
  isDark=true;
  modeToggle(){
     this.isDark=!this.isDark;
     document.documentElement.setAttribute("data-theme",this.isDark ?'dark' :'light')
    }

//   darkClassName='theme-dark';
//   lightClassName='theme-light';
//   togglControl= new FormControl(false);
//   @HostBinding('class') className='';

  ngOnInit(): void { 

    this.modeToggle()
  }
//    this.togglControl.valueChanges.subscribe(darkMode =>{
//     this.className =darkMode ? this.darkClassName :this.lightClassName;


//     if(darkMode){
//       this.overlay.getContainerElement().classList.add(this.darkClassName)
//     }
//     else{
//       this.overlay.getContainerElement().classList.add(this.lightClassName)

//     }
//    })

//   }

 }
