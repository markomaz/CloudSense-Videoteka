window.onload = function() {
    const VALUTA = " HRK";

    const tablica_filmova = document.getElementById("glavna-tablica");
    const tijelo_tablice = tablica_filmova.getElementsByTagName("tbody")[0];

    const naziv_field = document.getElementById("unos-naziva");
    const cijena_field = document.getElementById("unos-cijene");

    naziv_field.onchange = function() {
        naziv_field.classList.remove("input-error");
    }
    cijena_field.onchange = function() {
        cijena_field.classList.remove("input-error");
    }

    const button_dodaj = document.getElementById("dodaj-film-button");

    button_dodaj.onclick = function(){
        let errors = validateInput();

        if (errors.length != 0) {
            errors.forEach(function(input_field) {
                input_field.classList.add("input-error");
            });

            return;
        } else {
            addRow();
            updatePrice();
            clearInputFields();
        } 
    };


    function validateInput() {
        let errors = [];

        let uneseni_naziv = naziv_field.value.trim();
        let unesena_cijena = cijena_field.value.trim();

        if (uneseni_naziv == '') {
            errors.push(naziv_field);
        }

        if (unesena_cijena == '') {
            errors.push(cijena_field);
        } else if (unesena_cijena < 0) {
            errors.push(cijena_field);
        }

        return errors; 
    }

    function clearInputFields() {
        naziv_field.value = '';
        cijena_field.value = '';
    }

    function addRow() {
        let naziv_filma = naziv_field.value.trim();
        let cijena_filma = parseFloat(cijena_field.value.trim());

        let novi_red = tijelo_tablice.insertRow();

        let ćelija_1 = novi_red.insertCell(0);
        let ćelija_2 = novi_red.insertCell(1);
        let ćelija_3 = novi_red.insertCell(2);

        ćelija_1.innerHTML = tijelo_tablice.rows.length;
        ćelija_2.innerHTML = naziv_filma;
        ćelija_3.innerHTML = cijena_filma.toFixed(2);

    }

    function updatePrice() {
        let suma_field = document.getElementById("suma-iznos");
        let popust_field = document.getElementById("popust-iznos");
        let ukupno_field = document.getElementById("ukupno-iznos");

        let stara_suma = suma_field.innerHTML;

        if (stara_suma == '') {
            stara_suma = 0;
        } else {
            stara_suma = parseFloat(stara_suma);
        }

        let unesena_cijena = parseFloat(cijena_field.value.trim());
        let nova_suma = stara_suma + unesena_cijena;

        let popust = 0;
        if (tijelo_tablice.rows.length > 2) {
            popust = nova_suma * 0.05;
        }
        
        let ukupno = nova_suma - popust;

        suma_field.innerHTML = nova_suma.toFixed(2) + VALUTA;
        popust_field.innerHTML = "-" + popust.toFixed(2) + VALUTA;
        ukupno_field.innerHTML = ukupno.toFixed(2) + VALUTA;
    }
}