export default [
    {
        // files mana saja yg di analisis
        "files": [
            // semua folder dan file yang terdapat didalam folder src
            "src/**/*.js"
        ],
        // file mana saja yang tidak di analisis
        "ignores": [
            "src/person.js"
        ],
        "rules": {
            // semi error = setiap baris code harus di akhiri dengan titik koma, jika tidak akan error
            "semi": "error",
            "prefer-const": "error",
            "require-await": "error"
        }
    }
]