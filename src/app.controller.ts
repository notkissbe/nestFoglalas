import { Body, Controller, Get, Post, Redirect, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Foglalas } from './foglalas.dto';
import { Response } from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Redirect('foglalas')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get("foglalas")
  @Render("urlap")
  getFoglalas() {
    return {
      errors: [],
      data: []
    }

  }
  @Get("siker")
  @Render("siker")
  getSiker() {
    return {
    }

  }

  @Post("foglalas")
  postFoglalas(
    @Body() Foglalas: Foglalas,
    @Res() response: Response
  ) {
    let errors = [];

    if (!Foglalas.nev || !Foglalas.email || !Foglalas.datum || !Foglalas.ido || !Foglalas.vendegszam) {
      errors.push("Minden mezőt ki kell tölteni!");
    }

    if(!/^[\w\.]+@[\w-\.]+$/.test(Foglalas.email)){
      errors.push("Nem megfelelő email formátum!");
    }

    if(Date.parse(`${Foglalas.datum} ${Foglalas.ido}`) < Date.now()){
      errors.push("Múltbéli időpont!");
    }

    if(Foglalas.vendegszam < 1 || Foglalas.vendegszam > 10){
      errors.push("Nem megfelelő a vendégek száma!");
    }

    if (errors.length > 0) {
      response.render("urlap", {
        data: Foglalas,
        errors: errors
      })
      return errors;
    }

    console.log(Foglalas);
    

    return response.redirect('/siker')
  }



}
