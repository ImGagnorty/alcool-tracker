# Icônes PWA

Pour que l'application fonctionne correctement en tant que PWA, vous devez créer deux fichiers PNG :

1. `icon-192.png` - 192x192 pixels
2. `icon-512.png` - 512x512 pixels

## Méthode 1 : Utiliser un outil en ligne
1. Allez sur https://realfavicongenerator.net/ ou https://www.pwabuilder.com/imageGenerator
2. Téléchargez le fichier `icon.svg` depuis le dossier `public`
3. Générez les icônes aux tailles requises
4. Placez les fichiers `icon-192.png` et `icon-512.png` dans le dossier `public`

## Méthode 2 : Utiliser ImageMagick (si installé)
```bash
magick convert icon.svg -resize 192x192 icon-192.png
magick convert icon.svg -resize 512x512 icon-512.png
```

## Méthode 3 : Utiliser un éditeur d'image
1. Ouvrez `icon.svg` dans un éditeur d'image (GIMP, Photoshop, etc.)
2. Exportez en PNG aux dimensions 192x192 et 512x512
3. Placez les fichiers dans le dossier `public`

**Note** : Pour l'instant, l'application fonctionnera sans ces icônes, mais elles sont recommandées pour une meilleure expérience utilisateur.

