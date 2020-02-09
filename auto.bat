:: AutoRunBatFile.exe 1800000 auto.bat
node autoRefleshAndDear.js
node Iwant/getIwant.js
node extend/web/makeOneMapJson.js

git add *
git commit -m"%date% %time% update data"
git push