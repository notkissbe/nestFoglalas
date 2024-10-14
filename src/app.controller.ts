import { Body, Controller, Get, Post, Redirect, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Foglalas } from './foglalas.dto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('foglalas')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get("foglalas")
  @Render("urlap")
  getFoglalas(){
    return{
      errors:[],
      foglalas:[]
    }

  }
  @Get("siker")
  @Render("siker")
  getSiker(){
    return{
    }

  }

  @Post("foglalas")
  postFoglalas(
    @Body() Foglalas:Foglalas,
    @Res() response:Response
  ){
    let errors = [];

    console.log()
    return Response.redirect("/siker")
  }



}
