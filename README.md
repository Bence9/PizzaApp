# 6. Pizza rendelések
Általános leírás

A cél, egy telefonos pizzarendelő szolgáltatás informatikai hátterének tervezése és megvalósítása. A rendelések telefonon érkeznek. Az 5000 ft-nál (konfigurálható) többet rendelő ügyfelek automatikusan kedvezményt kapnak.
Felhasználási esetek
Rendelés

Csak az rendelhet pizzát, akit a rendszerben nyílvántartásba vettek. Információk: név, cím, telefon, stb megadása. A regisztrált felhasználók rendelhetnek pizzát és egyéb ételeket. A rendelés végén az diszpécser meadja, hogy mennyi lesz a fizetendő összeg és mennyi idő múlva tudják teljesíteni a rendelést. Ezt az alapján számolja ki, hogy minden pizza 20 percig (konfigurálható) sül, és a pizzéria rendelkezik 5 (konfigurálható számú) sütővel. Azaz 5 pizzát lehet egyszerre sütni. A kiszállítás átlagos ideje 20 perc. Így a minimum kiszállítási idő 40 perc. Ha jelenleg 5 pizza sül és a legelső 5 perc múlva készül el, akkor 5+20+20 = 45 percet kell mondani a vevőnek. Ha a vevő sokallja ezt az időt a megrendelést lehet törölni.
Étlap menedzselés

Itt lehet az egyes pizza és étel típusokat bevinni a rendszerbe. Lehetséges attributumok: ár, méret, leírás, sütési/elkészítési idő.
Sütőmenedzsment

Ez a funkció felelős a sütő és a konyha foglaltsági állapotának vizsgálatára: meg lehet tekinteni az egyes sütők állapotát. (süt/nem süt) Egyszerűsítésképpen a konyhában egyszerre 5 étel készíthető. A szakácsokat nem adminisztráljuk.
