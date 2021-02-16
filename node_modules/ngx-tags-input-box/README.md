<img src="https://image.flaticon.com/icons/svg/3002/3002407.svg" width="150px" title="STAR RATING" alt="STAR">

# Ngx-tags

> Tags input component for angular projects (Also supports angular 9)

> Creative tags input with mutiple color variance and limitable tag range.

# Preview demo

This preview was generated with [Stackblitz](https://stackblitz.com/edit/ngx-tags-input)
<img src="https://github.com/manoj10101996/ngx-tags-input-box/blob/master/ss.png?raw=true" width="100%" title="NGX TAGS" alt="STAR">


# Angular version

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.9.

## Code integration

To use this package as a service `npm i ngx-tags-input-box` install this on the root angular project .

> Note: Don't forget to run this commend `npm i ngx-tags-input-box`   on root folder or else it will throw error.

## Import

Import the module on your `app.module.ts` file as follow.

> import { NgxTagsModule } from "ngx-tags-input-box";

Then import the module as follow on imports array

>NgxTagsModule

## Using

After importing this library with `npm  install ngx-tags-input-box`, go to the component which is declared under `app.module.ts` and integrate as below.

## Tags input module


> `<ngx-tags-input [limit]="limit" [header]="header" [placeholder]="placeholder" [mode]="mode" (tagsChange)="displayTags($event)"></ngx-tags-input>`

> mode : (required) value shoule be `primary | success | danger | info | warning`

> limit : (required) value shoule be `0 - n` (default 5)

> placeholder : (required) value shoule be `anything...`

> header : (optional) value shoule be `anything...`


## Retrive list as tags entered

On your component file where you are using `ngx-tag-input`

> tagsInput = []; //any variable where you want to hold as list.

##Function call 

> displayTags(tag) { 
>   this.tagsInput = tag;
> }


## Further help

To get more help on the usage  check out the [Ngx rating star README](https://github.com/manoj10101996/ngx-tags-input-box/blob/master/README.md).


