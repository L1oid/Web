set name=lab6

cd .\%name%
"c:\program files\winrar\winrar.exe" a -r -afzip .\%name%.zip .\*
cd ..
rename .\%name%\%name%.zip %name%.war
del /q C:\Users\lloid\Study\Portable\GlassFish\glassfish\domains\domain1\autodeploy\%name%.war
del /q C:\Users\lloid\Study\Portable\GlassFish\glassfish\domains\domain1\autodeploy\%name%.war_deployed
del /q C:\Users\lloid\Study\Portable\GlassFish\glassfish\domains\domain1\autodeploy\%name%.war_deployFailed
move .\%name%\%name%.war C:\Users\lloid\Study\Portable\GlassFish\glassfish\domains\domain1\autodeploy\
del /q .\%name%\%name%.war
del /q .\%name%\%name%.zip