:: AutoRunBatFile.exe 1800000 auto.bat
node autoRefleshAndDear.js
node Iwant/getIwant.js

git add *
git commit -m"%date% %time% 提交"
git push