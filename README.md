# Dipette 💉
Dipette is a Windows desktop Application which can select colors of your screen. Afterwards you can copy the RGB, HEX or CMYK values via button click.

![Dipette screenshot](https://github.com/ValerianWeiss/Dipette/blob/master/readme_resources/Demo.png)

The Project is build with electron, react and a C# executable. Electron is wrapping the react app. React is communicating with the C# executable which sends the color values of the screen to the frontend.

## How to build
To build you need the `csc` compiler to complile the C# module. You also have to place the Newtonsoft.Json in the `Dipette/src/ScreenChecker/libs` folder. If this is done you can run:
```bash
run npm insall
npm run electron-pack
```
It is also possible to run the scripts with yarn.
The App will be build to the `Dipette/dist/win-unpacked` folder.

## How to download
To test and the app you can download it [here](https://github.com/ValerianWeiss/Dipette/releases "releases"), unpack the zip and run the Dipette.exe.

> #### Note:
> The `setup.exe` is not working at the moment because it does not contain the C# executable at the moment.
