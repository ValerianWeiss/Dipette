#!/bin/bash
cp -r ./libs/Newtonsoft.Json.dll ../../dist/win-unpacked
csc -r:./libs/Newtonsoft.Json.dll -out:../../dist/win-unpacked/ScreenChecker.exe *.cs