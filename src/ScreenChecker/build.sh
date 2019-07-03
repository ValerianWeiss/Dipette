#!/bin/bash
mkdir ../../public/ScreenChecker
cp -r ./libs/Newtonsoft.Json.dll ../../public/ScreenChecker/
csc -r:./libs/Newtonsoft.Json.dll -out:../../public/ScreenChecker/ScreenChecker.exe *.cs