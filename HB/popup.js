// popup.js

// Renk paletleri
const colorPalettes = {
    hepsiburada: ["#D95200", "#FF6000", "#FFBF99", "#FFDFCC", "#FFEFE6", "#FFF7F2"],
    premium: ["#BE0371", "#DF0485", "#F29BCE", "#F9CDE7", "#FCE6F3", "#FDF2F9"],
    hepsipay: ["#651EBA", "#7723DB", "#C9A7F1", "#E4D3F8", "#F1E9FB", "#F8F4FD"],
    success: ["#067E48", "#079455", "#9CD4BB", "#CDEADD", "#E6F4EE", "#F3FAF7"],
    error: ["#C4303C", "#E63946", "#F5B0B5", "#FAD7DA", "#FDEBED", "#FEF5F6"],
    warning: ["#B17B18", "#D7961D", "#FED07A", "#FEDFA7", "#FFEFD3", "#FFF7E9"],
    info: ["#4675D9", "#528AFF", "#BAD0FF", "#DCE8FF", "#EEF3FF", "#F6F9FF"],
    advertorial: ["#FF6000", "#4AC7ED", "#7723DB", "#76BC21", "#5D196A"]
};

document.addEventListener('DOMContentLoaded', function() {
    const colorTextarea = document.getElementById('color');
    const colorPaletteSelect = document.getElementById('colorPalette');
    const objectTextarea = document.getElementById('object');
    const clearObjectIcon = document.getElementById('clearObject');
    const clearColorIcon = document.getElementById('clearColor');
    const clearPaletteIcon = document.getElementById('clearPalette');
    

    // Object textarea için clear icon kontrolü
    objectTextarea.addEventListener('input', function() {
        if (this.value.trim().length > 0) {
            clearObjectIcon.classList.add('active');
        } else {
            clearObjectIcon.classList.remove('active');
        }
    });

    // Color textarea için clear icon kontrolü
    colorTextarea.addEventListener('input', function() {
        if (this.value.trim().length > 0) {
            clearColorIcon.classList.add('active');
            // Color textarea dolu ise palette'i disable et
            colorPaletteSelect.disabled = true;
            colorPaletteSelect.style.opacity = '0.5';
            colorPaletteSelect.style.cursor = 'not-allowed';
        } else {
            clearColorIcon.classList.remove('active');
            // Color textarea boş ise palette'i aktif et
            colorPaletteSelect.disabled = false;
            colorPaletteSelect.style.opacity = '1';
            colorPaletteSelect.style.cursor = 'pointer';
        }
    });

    // Clear object icon click
    clearObjectIcon.addEventListener('click', function() {
        objectTextarea.value = '';
        this.classList.remove('active');
        objectTextarea.focus();
    });

    // Clear color icon click
    clearColorIcon.addEventListener('click', function() {
        colorTextarea.value = '';
        this.classList.remove('active');
        colorTextarea.focus();
        // Palette'i tekrar aktif et
        colorPaletteSelect.disabled = false;
        colorPaletteSelect.style.opacity = '1';
        colorPaletteSelect.style.cursor = 'pointer';
    });

    // Color palette seçildiğinde
    colorPaletteSelect.addEventListener('change', function() {
        const colorPreview = document.getElementById('colorPreview');
        
        if (this.value !== '') {
            // Palette seçili ise color textarea'yı disable et
            colorTextarea.disabled = true;
            colorTextarea.style.opacity = '0.5';
            colorTextarea.style.cursor = 'not-allowed';
            
            // Color preview'ı göster ve güncelle
            colorPreview.classList.add('active');
            updateColorPreview(this.value);
            // Clear icon'u aktif et ve oku gizle
            clearPaletteIcon.classList.add('active');
            colorPaletteSelect.style.setProperty('--select-arrow', 'none');
        } else {
            // Palette seçili değilse color textarea'yı aktif et
            colorTextarea.disabled = false;
            colorTextarea.style.opacity = '1';
            colorTextarea.style.cursor = 'text';
            
            // Color preview'ı gizle
            colorPreview.classList.remove('active');
            // Clear icon'u gizle ve oku geri getir
            clearPaletteIcon.classList.remove('active');
            colorPaletteSelect.style.removeProperty('--select-arrow');
        }
    });

    // Clear palette selection on icon click
    clearPaletteIcon.addEventListener('click', function() {
        colorPaletteSelect.value = '';
        const event = new Event('change');
        colorPaletteSelect.dispatchEvent(event);
    });

    // Color preview'ı güncelleyen fonksiyon
    function updateColorPreview(paletteValue) {
        const colorPreview = document.getElementById('colorPreview');
        const colors = colorPalettes[paletteValue];
        
        if (colors) {
            let html = '<div class="color-squares">';
            
            colors.forEach(color => {
                html += `<div class="color-square" style="background-color: ${color};"></div>`;
            });
            
            html += '</div>';
            colorPreview.innerHTML = html;
        }
    }


    document.getElementById('jsonForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const objectValue = document.getElementById('object').value.trim();
        const colorValue = colorTextarea.value.trim();
        const paletteValue = colorPaletteSelect.value;
        const generateBtn = document.getElementById('generateBtn');
        const loading = document.getElementById('loading');
        const result = document.getElementById('result');
        const jsonOutput = document.getElementById('jsonOutput');

        // Validasyon: Object mutlaka dolu olmalı
        if (!objectValue) {
            alert('Lütfen Object alanını doldurun.');
            return;
        }

        // Validasyon: Color veya Color Palette'ten en az biri dolu olmalı
        if (!colorValue && !paletteValue) {
            alert('Lütfen Color alanını doldurun veya Color Palette seçin.');
            return;
        }

        generateBtn.disabled = true;
        loading.classList.add('active');
        result.classList.remove('active');

        setTimeout(function() {
            const jsonData = {
                "style": "Soft realistic 3D icon",
                "object": objectValue,
                "canvas": {
                    "width": 1024,
                    "height": 1024,
                    "padding": 50
                },
                "composition": {
                    "background": "transparent (must be completely transparent, no solid fill, no gradient)",
                    "background_alpha": 0,
                    "lighting": "studio lighting, bright key light, Pixar-style color balance, slight rim light, volumetric soft light",
                    "material": "clay-like, semi-gloss finish",
                    "perspective": "isometric",
                    "contrast": "medium-high",
                    "shadows": "none",
                    "example 1": "https://raw.githubusercontent.com/hellocihan/hellocihan.github.io/refs/heads/main/assets/ai/01.png",
                    "example 2": "https://raw.githubusercontent.com/hellocihan/hellocihan.github.io/refs/heads/main/assets/ai/02.png",
                    "example 3": "https://raw.githubusercontent.com/hellocihan/hellocihan.github.io/refs/heads/main/assets/ai/03.png",
                    "example 4": "https://raw.githubusercontent.com/hellocihan/hellocihan.github.io/refs/heads/main/assets/ai/04.png",
                    "example 5": "https://raw.githubusercontent.com/hellocihan/hellocihan.github.io/refs/heads/main/assets/ai/05.png",
                    "example 6": "https://raw.githubusercontent.com/hellocihan/hellocihan.github.io/refs/heads/main/assets/ai/06.png",
                    "example 7": "https://raw.githubusercontent.com/hellocihan/hellocihan.github.io/refs/heads/main/assets/ai/07.png",
                    "example 8": "https://raw.githubusercontent.com/hellocihan/hellocihan.github.io/refs/heads/main/assets/ai/08.png",
                    "example 9": "https://raw.githubusercontent.com/hellocihan/hellocihan.github.io/refs/heads/main/assets/ai/09.png",
                    "example 10": "https://raw.githubusercontent.com/hellocihan/hellocihan.github.io/refs/heads/main/assets/ai/10.png",
                    "example 11": "https://raw.githubusercontent.com/hellocihan/hellocihan.github.io/refs/heads/main/assets/ai/11.png",
                    "example 12": "https://raw.githubusercontent.com/hellocihan/hellocihan.github.io/refs/heads/main/assets/ai/12.png",
                    "example 13": "https://raw.githubusercontent.com/hellocihan/hellocihan.github.io/refs/heads/main/assets/ai/13.png"
                },
                "quality": "ultra HD, high detail",
                "restrictions": "no text, no background elements, no borders, no human, no watermark, no reflection, no shadows",
                "directives": {
                    "transparency_rule": "The background must be fully transparent using both the standard 'transparent' setting and alpha value = 0. Absolutely no visible background color, gradient, or pattern is allowed.",
                    "transparency_rule": "Output must preserve alpha channel in the exported PNG file (checkerboard backgrounds are not accepted).",
                    "style_reference_rule": "The examples (01–13) define the exact lighting, material, depth, color balance, and composition style. The generated image MUST replicate that exact 3D visual language and atmosphere. These references are absolute and non-negotiable visual standards."
                }
            };

            // Color değeri varsa ekle
            if (colorValue) {
                jsonData.color = colorValue;
            }

            // Eğer renk paleti seçildiyse JSON'a ekle
            if (paletteValue && colorPalettes[paletteValue]) {
                jsonData.colorPalette = colorPalettes[paletteValue];
            }

            const jsonString = JSON.stringify(jsonData, null, 2);
            jsonOutput.textContent = jsonString;
            
            generateBtn.disabled = false;
            loading.classList.remove('active');
            result.classList.add('active');
        }, 500);
    });

    document.getElementById('copyBtn').addEventListener('click', function() {
        const jsonOutput = document.getElementById('jsonOutput');
        const copyBtn = document.getElementById('copyBtn');
        
        navigator.clipboard.writeText(jsonOutput.textContent).then(function() {
            // Sayacı azalt (engelleme yok)
            decrementCounter();
            
            copyBtn.textContent = 'Copied!';
            copyBtn.classList.add('copied');
            
            setTimeout(function() {
                copyBtn.classList.remove('copied');
                updateCopyButton();
            }, 2000);
        }).catch(function(err) {
            alert('Kopyalama başarısız: ' + err);
        });
    });

});