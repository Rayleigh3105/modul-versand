/**
 * TODO - Create Form and send data to Controller
 * TODO - Lookup all patternns if they are working
 *
 * @author Moritz Vogt
 */

let previosKg = 0;
let previosTermin = null;
let previosSonderdienstTermin = null;
let previosShipping = 0;
let previosValueWert = 0;
let defaultValue = 20;
let formDataObject = new FormData();

// ON LOAD
/**
 * Set´s initial values
 */
window.onload = function () {

    // Getter
    let submitExlMwst = document.getElementById('submit_exkl-mwst');
    let submitInklMwst = document.getElementById('submit_inkl-mwst');
    let submitKg = document.getElementById('submit_kg');
    let inputRadioStandardAbholzeit = document.getElementById('abolzeit_standard');
    let inputCalculateInsuranceNo = document.getElementById('sendungsdaten_sendungsdaten-nein');
    let inputRadioStandardZustelltermin = document.getElementById('zustelltermin_standard');
    let inputRadioStandardSonderdienste = document.getElementById('sonderdienst_standard');

    // Disable Radio button for
    inputRadioStandardAbholzeit.disabled = true;
    inputCalculateInsuranceNo.disabled = true;
    inputRadioStandardZustelltermin.disabled = true;
    inputRadioStandardSonderdienste.disabled = true;

    submitExlMwst.value = defaultValue.toFixed(2);
    let mwstValue = submitExlMwst.value * 19 / 100;
    let submitinklres = 20 + mwstValue;

    submitInklMwst.value = `${submitinklres.toFixed(2)}`;
    submitKg.value = "3,00";

};

/**
 * Calculates transportvericherungs input field and submitFields
 */
function calcShippingInsurance(IsSubtract) {

    // GETTER
    let valueWert = document.getElementById('sendungsdaten_wert').value;
    let valueInsurance = document.getElementById('sendungdaten_transportversicherung');
    let inputCalculateInsuranceYes = document.getElementById('sendungsdaten_sendungsdaten-ja');

    // Check if Insurance must be calculated
    if (valueWert.length > 3 && inputCalculateInsuranceYes.checked === true) {
        updateSubmitFields(previosValueWert, true);

        // This implements the logic that for every 1000 € -> 2€ Shipping Insurance is calculated
        const divide = parseInt(valueWert) / 1000;
        if(isNaN(divide)) return;
        var val = Math.floor(divide) * 2;
        previosValueWert = val;
        valueInsurance.value = val.toFixed(2);

        if (IsSubtract === true) {
            updateSubmitFields(val, true);
        } else {
            updateSubmitFields(val, false);
        }
    } else {
        if (previosShipping !== undefined) {
            updateSubmitFields(previosShipping, true );
        }
        previosValueWert = 0;
        valueInsurance.value = 0;
    }
    previosShipping = val !== null ? val : null;
}



/**
 * Display box for manual shipping based on parameter
 * @param val
 */
function checkIfManual(val) {

    // Getter
    let boxToHide = document.getElementById('manuell_eingabe');
    let inputRadioAuftragsBestHerr = document.getElementById('auftragsbest_herr');
    let inputRadioAuftragsBestFrau = document.getElementById('auftragsbest_firma');
    let inputRadioAuftragsBestFirma = document.getElementById('auftragsbest_firma');
    let inputRadioAuftragsBestName = document.getElementById('auftragsbest_name');
    let inputRadioAuftragsBestStr = document.getElementById('auftragsbest_str');
    let inputRadioAuftragsBestHausNr = document.getElementById('auftragsbest_hausnr');
    let inputRadioAuftragsBestPlz = document.getElementById('auftragsbest_plz');
    let inputRadioAuftragsBestOrt = document.getElementById('auftragsbest_ort');

    if (val === 'manu') {
        boxToHide.style.display = "initial";
        inputRadioAuftragsBestHerr.required = true;
        inputRadioAuftragsBestFrau.required = true;
        inputRadioAuftragsBestFirma.required = true;
        inputRadioAuftragsBestName.required = true;
        inputRadioAuftragsBestStr.required = true;
        inputRadioAuftragsBestHausNr.required = true;
        inputRadioAuftragsBestPlz.required = true;
        inputRadioAuftragsBestOrt.required = true;
    } else {
        boxToHide.style.display = "none";
        inputRadioAuftragsBestHerr.required = false;
        inputRadioAuftragsBestFrau.required = false;
        inputRadioAuftragsBestFirma.required = false;
        inputRadioAuftragsBestName.required = false;
        inputRadioAuftragsBestStr.required = false;
        inputRadioAuftragsBestHausNr.required = false;
        inputRadioAuftragsBestPlz.required = false;
        inputRadioAuftragsBestOrt.required = false;
    }
}

/**
 * Displays dopdown based on parameter and calculates submitFields
 * @param val
 */
function checkIfWunschAndCalculateSubmit(val) {
    let boxToHide = document.getElementById('select-wunschabholzeit');
    let inputWunschRadio = document.getElementById('abolzeit_wunsch');
    let inputStandardRadio = document.getElementById('abolzeit_standard');
    if (val === 'wunsch'){
        boxToHide.style.display = "initial";
        inputWunschRadio.disabled = true;
        inputStandardRadio.disabled = false;
        updateSubmitFields(5.50, false)
    } else {
        boxToHide.style.display = "none";
        inputWunschRadio.disabled = false;
        inputStandardRadio.disabled = true;
        updateSubmitFields(5.50, true)
    }
}

/**
 *  Displays Transportversicherungs input field based on parameter and calculates InputField
 * @param val
 */
function checkIfYesAndCalculateInsurance(val) {
    // Getter
    let boxToHide = document.getElementById('mv-display-transportversicherung');
    let sendungsdaten_wert = document.getElementById('sendungsdaten_wert');

    let inputCalculateInsuranceNo = document.getElementById('sendungsdaten_sendungsdaten-nein');
    let inputCalculateInsuranceYes = document.getElementById('sendungsdaten_sendungsdaten-ja');

    // Calculates Shipping Insurance and handles disabling of radio buttons so they dont get clicked twice
    if (val === 'y'){
        boxToHide.style.display = "initial";
        inputCalculateInsuranceNo.disabled = false;
        inputCalculateInsuranceYes.disabled = true;
        sendungsdaten_wert.addEventListener('input',calcShippingInsurance);
        calcShippingInsurance(false);
    } else {
        boxToHide.style.display = "none";
        inputCalculateInsuranceNo.disabled = true;
        inputCalculateInsuranceYes.disabled = false;
        sendungsdaten_wert.removeEventListener('input', calcShippingInsurance);
        calcShippingInsurance(true)
    }
}

/**
 * Updates Submit Fields (Inkl Mwst ,Excl Mwst, KG) with given parameters
 */
function updateSubmitFields(val, isSubtract) {
    // GETTER
    let sendungsdatenKgSelect = document.getElementById('sendungsdaten_kg');
    let submitExlMwst = document.getElementById('submit_exkl-mwst');
    let submitInklMwst = document.getElementById('submit_inkl-mwst');
    let sendungsdatenValue = sendungsdatenKgSelect.options[sendungsdatenKgSelect.selectedIndex].value;
    let submitKg = document.getElementById('submit_kg');

    // Subtracts value to its inital value to make further calculation easier
    if(previosKg && previosKg !== 3 && !isSubtract){
        submitExlMwst.value = (submitExlMwst.value - parseFloat(previosKg) / 2).toFixed(2);
        submitInklMwst.value = calculateMwSt(submitExlMwst.value);
    }

    // Calculates new Inkl MwSt, Excl Mwst with or without extra value
    switch (sendungsdatenValue) {
        case "1":
        case "2":
        case "3":
        case "4":
                submitExlMwst.value = calculateExclMwStValue(val, null, isSubtract, submitExlMwst.value);
                submitInklMwst.value = calculateMwSt(submitExlMwst.value);
                previosKg = 3;
            break;
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            submitExlMwst.value = calculateExclMwStValue(val, 2.50, isSubtract, submitExlMwst.value);
            submitInklMwst.value = calculateMwSt(submitExlMwst.value);
            previosKg = 5;
            break;
        case "10":
        case "11":
        case "12":
        case "13":
        case "14":
            submitExlMwst.value = calculateExclMwStValue(val, 5.00, isSubtract, submitExlMwst.value);
            submitInklMwst.value = calculateMwSt(submitExlMwst.value);
            previosKg = 10;
            break;
        case "15":
        case "16":
        case "17":
        case "18":
        case "19":
            submitExlMwst.value = calculateExclMwStValue(val, 7.50, isSubtract, submitExlMwst.value);
            submitInklMwst.value = calculateMwSt(submitExlMwst.value);
            previosKg = 15;
            break;
        case "20":
        case "21":
        case "22":
        case "23":
        case "24":
            submitExlMwst.value = calculateExclMwStValue(val, 10.00, isSubtract, submitExlMwst.value);
            submitInklMwst.value = calculateMwSt(submitExlMwst.value);
            previosKg = 20;
            break;
        case "25":
        case "26":
        case "27":
        case "28":
        case "29":
            submitExlMwst.value = calculateExclMwStValue(val, 12.50, isSubtract, submitExlMwst.value);
            submitInklMwst.value = calculateMwSt(submitExlMwst.value);
            previosKg = 25;
            break;
        case "30":
            submitExlMwst.value = calculateExclMwStValue(val, 15.00, isSubtract, submitExlMwst.value);
            submitInklMwst.value = calculateMwSt(submitExlMwst.value);
            previosKg = 30;
            break;
    }
    submitKg.value = parseFloat(sendungsdatenValue).toFixed(2);
    }

/**
 * Calculates the the value without the MwSt
 * @param val - dynamic value which can be set
 * @param shippingInsuranceValue - value for the shipping Insurance
 * @param isSubtract
 * @param exclValue - currst value without MwSt
 * @returns {string}
 */
function calculateExclMwStValue(val, shippingInsuranceValue, isSubtract, exclValue) {
    if(val) {
        if(isSubtract) {
            return (parseFloat(exclValue) - val).toFixed(2);
        } else {
           return (parseFloat(exclValue) + shippingInsuranceValue + val).toFixed(2);
        }
    } else {
        return (parseFloat(exclValue) + shippingInsuranceValue).toFixed(2);
    }
}
/**
 * Return the calculated MwSt based on the value
 * @param baseValue
 * @returns {string}
 */
function calculateMwSt(baseValue) {
    let mwstValue = parseFloat(baseValue) * 19 / 100;
    return (parseFloat(baseValue) + mwstValue).toFixed(2)
}

/**
 * Calculates Submit Fields for Zusteller Termin also handles enabling and disabling of radio button
 * This is made to prevent mutible clicking on the same radio button
 *
 * @param terminType
 */
function calculateSubmitFieldswithTermin(terminType) {
    // Getter
    let boxToHide = document.getElementById('select-fixtermin');
    let inputRadioTerminStandard = document.getElementById('zustelltermin_standard');
    let inputRadioTermin9 = document.getElementById('zustelltermin_termin_9');
    let inputRadioTermin10 = document.getElementById('zustelltermin_termin_10');
    let inputRadioTermin12 = document.getElementById('zustelltermin_termin_12');
    let inputRadioTerminFix = document.getElementById('zustelltermin_fix');

    switch (terminType) {
        case "standard":
            boxToHide.style.display = "none";
            // Enable / Disable Input Radio fields
            inputRadioTerminStandard.disabled = true;
            inputRadioTermin9.disabled = false;
            inputRadioTermin10.disabled = false;
            inputRadioTermin12.disabled = false;
            inputRadioTerminFix.disabled = false;
            if(previosTermin !== null) {
                this.updateSubmitFields(previosTermin, true);
            }
            previosTermin = null;
            break;
        case "termin9":
            boxToHide.style.display = "none";
            // Enable / Disable Input Radio fields
            inputRadioTerminStandard.disabled = false;
            inputRadioTermin9.disabled = true;
            inputRadioTermin10.disabled = false;
            inputRadioTermin12.disabled = false;
            inputRadioTerminFix.disabled = false;
            if(previosTermin !== null) {
                this.updateSubmitFields(previosTermin, true);
            }
            previosTermin = 15.50;
            this.updateSubmitFields(previosTermin, false);
            break;
        case "termin10":
            boxToHide.style.display = "none";
            // Enable / Disable Input Radio fields
            inputRadioTerminStandard.disabled = false;
            inputRadioTermin9.disabled = false;
            inputRadioTermin10.disabled = true;
            inputRadioTermin12.disabled = false;
            inputRadioTerminFix.disabled = false;
            if(previosTermin !== null) {
                this.updateSubmitFields(previosTermin, true);
            }
            previosTermin = 13.00;
            this.updateSubmitFields(previosTermin, false);
            break;
        case "termin12":
            boxToHide.style.display = "none";
            // Enable / Disable Input Radio fields
            inputRadioTerminStandard.disabled = false;
            inputRadioTermin9.disabled = false;
            inputRadioTermin10.disabled = false;
            inputRadioTermin12.disabled = true;
            inputRadioTerminFix.disabled = false;
            if(previosTermin !== null) {
                this.updateSubmitFields(previosTermin, true);
            }
            previosTermin = 8.00;
            this.updateSubmitFields(previosTermin, false);
            break;
        case "fix":
            boxToHide.style.display = "initial";
            // Enable / Disable Input Radio fields
            inputRadioTerminStandard.disabled = false;
            inputRadioTermin9.disabled = false;
            inputRadioTermin10.disabled = false;
            inputRadioTermin12.disabled = false;
            inputRadioTerminFix.disabled = true;
            if(previosTermin !== null) {
                this.updateSubmitFields(previosTermin, true);
            }
            previosTermin = 40.00;
            this.updateSubmitFields(previosTermin, false);
            break;
    }
}
/**
 * Calculates Submit Fields for SonderDienst Termin also handles enabling and disabling of radio button
 * This is made to prevent mutible clicking on the same radio button
 *
 * @param sonderDienstType
 */
function calculateSubmitFieldswithSonderTermin(sonderDienstType) {
    // Getter
    let inputRadioStandard = document.getElementById('sonderdienst_standard');
    let inputRadioPersoenlich = document.getElementById('sonderdienst_persoenlich');
    let inputRadioPersoenlichWithIdent = document.getElementById('sonderdienst_persoenlich_withIdent');
    let boxToHidePersoenlich = document.getElementById('sonderdienst_box_persoenlich');
    let boxToHidePersoenlichWithIdent = document.getElementById('sonderdienst_box_persoenlich_withIdent');

    switch (sonderDienstType) {
        case "standard":
            // Enable / Disable Input Radio fields
            inputRadioStandard.disabled = true;
            inputRadioPersoenlich.disabled = false;
            inputRadioPersoenlichWithIdent.disabled = false;
            boxToHidePersoenlich.style.display = "none";
            boxToHidePersoenlichWithIdent.style.display = "none";
            if(previosSonderdienstTermin !== null) {
                this.updateSubmitFields(previosSonderdienstTermin, true);
            }
            previosSonderdienstTermin = null;
            this.updateSubmitFields(previosSonderdienstTermin, false);
            break;
        case "persoenlich":
            // Enable / Disable Input Radio fields
            inputRadioStandard.disabled = false;
            inputRadioPersoenlich.disabled = true;
            inputRadioPersoenlichWithIdent.disabled = false;
            boxToHidePersoenlich.style.display = "initial";
            boxToHidePersoenlichWithIdent.style.display = "none";
            if(previosSonderdienstTermin !== null) {
                this.updateSubmitFields(previosSonderdienstTermin, true);
            }
            previosSonderdienstTermin = 8.00;
            this.updateSubmitFields(previosSonderdienstTermin, false);

            break;
        case "ident":
            // Enable / Disable Input Radio fields
            inputRadioStandard.disabled = false;
            inputRadioPersoenlich.disabled = false;
            inputRadioPersoenlichWithIdent.disabled = true;
            boxToHidePersoenlich.style.display = "none";
            boxToHidePersoenlichWithIdent.style.display = "initial";
            if(previosSonderdienstTermin !== null) {
                this.updateSubmitFields(previosSonderdienstTermin, true);
            }
            previosSonderdienstTermin = 10.50;
            this.updateSubmitFields(previosSonderdienstTermin, false);
            break;
    }
}

/**
 * This function copy values from "Empfänger" to "Absender" or "Absender" to "Empfänger"
 * @param val
 */
function copyValues(val) {

    // Getter Empfänger
    let inputEmpfFirma = document.getElementById('empfaenger_name');
    let inputEmpfZusatz = document.getElementById('empfaenger_zusatz');
    let inputEmpfAnsprechpartner = document.getElementById('empfaenger_ansprechpartner');
    let inputEmpfStr = document.getElementById('empfaenger_str');
    let inputEmpfHausNr = document.getElementById('empfaenger_hausnr');
    let inputEmpfPlz = document.getElementById('empfaenger_plz');
    let inputEmpfOrt = document.getElementById('empfaenger_ort');
    let inputEmpfTel = document.getElementById('empfaenger_tel');

    // Getter Absender
    let inputAbsFirma = document.getElementById('absender_name');
    let inputAbsZusatz = document.getElementById('absender_zusatz');
    let inputAbsAnsprechpartner = document.getElementById('absender_ansprechpartner');
    let inputAbsStr = document.getElementById('absender_str');
    let inputAbsHausNr = document.getElementById('absender_hausnr');
    let inputAbsPlz = document.getElementById('absender_plz');
    let inputAbsOrt = document.getElementById('absender_ort');
    let inputAbsFTel = document.getElementById('absender_tel');

    // Logic
    if ( val === 'empf'){
        inputEmpfFirma.value = inputAbsFirma.value;
        inputEmpfZusatz.value = inputAbsZusatz.value;
        inputEmpfAnsprechpartner.value = inputAbsAnsprechpartner.value;
        inputEmpfStr.value = inputAbsStr.value;
        inputEmpfHausNr.value = inputAbsHausNr.value;
        inputEmpfPlz.value = inputAbsPlz.value;
        inputEmpfOrt.value = inputAbsOrt.value;
        inputEmpfTel.value = inputAbsFTel.value;
    }else if (val === 'abs') {
        inputAbsFirma.value = inputEmpfFirma.value;
        inputAbsZusatz.value = inputEmpfZusatz.value;
        inputAbsAnsprechpartner.value = inputEmpfAnsprechpartner.value;
        inputAbsStr.value = inputEmpfStr.value;
        inputAbsHausNr.value = inputEmpfHausNr.value;
        inputAbsPlz.value = inputEmpfPlz.value;
        inputAbsOrt.value = inputEmpfOrt.value;
        inputAbsFTel.value = inputEmpfTel.value;
    }
}

/**
 * Validates all Input fields
 */
function validateRequiredFields() {

    // Getter Empfänger
    let inputEmpfFirma = document.getElementById('empfaenger_name');
    let inputEmpfStr = document.getElementById('empfaenger_str');
    let inputEmpfHausNr = document.getElementById('empfaenger_hausnr');
    let inputEmpfPlz = document.getElementById('empfaenger_plz');
    let inputEmpfOrt = document.getElementById('empfaenger_ort');
    let inputSelectEmpfLand = document.getElementById('empfaenger_land');

    // Getter Absender
    let inputAbsFirma = document.getElementById('absender_name');
    let inputAbsStr = document.getElementById('absender_str');
    let inputAbsHausNr = document.getElementById('absender_hausnr');
    let inputAbsPlz = document.getElementById('absender_plz');
    let inputAbsOrt = document.getElementById('absender_ort');
    let inputSelectAbsLand = document.getElementById('absender_land');

    // Getter Abolzeit
    let inputSelectAbholDatum = document.getElementById('abholzeit_abholdatum');
    let inputRadioAbholStandard = document.getElementById('abolzeit_standard');
    let inputSelectAbholWunsch = document.getElementById('abholzeit_wunsch');

    // Getter ZustellerTermin
    let inputSelectZustellFixTermin = document.getElementById('zustelltermin_fix_select');
    let inputRadioZustellStandard = document.getElementById('zustelltermin_standard');
    let inputRadioZustellTermin9 = document.getElementById('zustelltermin_termin_9');
    let inputRadioZustellTermin10 = document.getElementById('zustelltermin_termin_10');
    let inputRadioZustellTermin12 = document.getElementById('zustelltermin_termin_12');
    let inputRadioZustellTerminFix = document.getElementById('zustelltermin_fix');

    // Getter Sonderdienst
    let inputRadioSonderdienstStandard = document.getElementById('sonderdienst_standard');
    let inputRadioSonderdienstPersoenlich = document.getElementById('sonderdienst_persoenlich');
    let inputRadioSonderdienstPersoenlichWithIdent = document.getElementById('sonderdienst_persoenlich_withIdent');

    // Getter Sendungsdaten
    let inputSelectSendungsdatenKG = document.getElementById('sendungsdaten_kg');
    let inputSendungsdatenWert = document.getElementById('sendungsdaten_wert');
    let inputSendugnsdatenTrans = document.getElementById('sendungdaten_transportversicherung');
    let inputRadioSendugnsdatenTransJa = document.getElementById('sendungsdaten_sendungsdaten-ja');

    // Submit fields
    let submitExlMwst = document.getElementById('submit_exkl-mwst');
    let submitInklMwst = document.getElementById('submit_inkl-mwst');

    // Getter
    let allInputs = document.getElementsByTagName("input");
    let form = document.getElementById('form');

  for (let i = 0; i < allInputs.length; i++) {
      if (!allInputs[i].validity.valid) {
          allInputs[i].setAttribute("class", "invalidInputs");
      }else {
          allInputs[i].classList.remove("invalidInputs");
      }
  }
  if(form.checkValidity()){
      // Fill Absender Data
      formDataObject.absData.absname = inputAbsFirma.value;
      formDataObject.absData.strHausNr = inputAbsStr.value + " - " + inputAbsHausNr.value;
      formDataObject.absData.plzOrt = inputAbsPlz.value + " - " + inputAbsOrt.value;
      formDataObject.absData.land = inputSelectAbsLand.options[inputSelectAbsLand.selectedIndex].value;

      // Empfänger
      formDataObject.empfData.empfname = inputEmpfFirma.value;
      formDataObject.empfData.strHausNr = inputEmpfStr.value + " - " + inputEmpfHausNr.value;
      formDataObject.empfData.plzOrt = inputEmpfPlz.value + " - " + inputEmpfOrt.value;
      formDataObject.empfData.land = inputSelectEmpfLand.options[inputSelectEmpfLand.selectedIndex].value;

      // Zustelltermin
      if(inputRadioZustellStandard.checked) {
          formDataObject.zustellerTerminData.zustellerTermin = "Standardzustelltermin";
          formDataObject.zustellerTerminData.kosten = "0,00 EUR";
      } else if (inputRadioZustellTermin9.checked) {
          formDataObject.zustellerTerminData.zustellerTermin = "Termin bis 09:00 Uhr";
          formDataObject.zustellerTerminData.kosten = "15,50 EUR";
      } else if (inputRadioZustellTermin10.checked) {
          formDataObject.zustellerTerminData.zustellerTermin = "Termin bis 10:00 Uhr";
          formDataObject.zustellerTerminData.kosten = "13,00 EUR";
      } else if (inputRadioZustellTermin12.checked) {
          formDataObject.zustellerTerminData.zustellerTermin = "Termin bis 12:00 Uhr";
          formDataObject.zustellerTerminData.kosten = "8,00 EUR";
      } else if (inputRadioZustellTerminFix.checked) {
          formDataObject.zustellerTerminData.zustellerTermin = "Fixtermin (" + inputSelectZustellFixTermin.options[inputSelectZustellFixTermin.selectedIndex].value + " Uhr)";
          formDataObject.zustellerTerminData.kosten = "40,00 EUR";
      }

      // Preis
      formDataObject.auftrag.auftragOhneMwst = submitExlMwst.value + " EUR";
      formDataObject.auftrag.auftragMwst = parseFloat(submitInklMwst.value - submitExlMwst.value).toFixed(2) + " EUR";
      formDataObject.auftrag.auftragMitMwst = submitInklMwst.value + " EUR";


      // Abholzeit
      formDataObject.abholZeitData.abholDatum = inputSelectAbholDatum.options[inputSelectAbholDatum.selectedIndex].value;
      if (inputRadioAbholStandard.checked){
          formDataObject.abholZeitData.abholTermin = "Standardabholtermin (zwischen 09:00 - 17:00 Uhr)";
          formDataObject.abholZeitData.kosten = "0,00 EUR"
      } else {
          formDataObject.abholZeitData.abholTermin = "Wunschtermin (" + inputSelectAbholWunsch.options[inputSelectAbholWunsch.selectedIndex].value + " Uhr)";
          formDataObject.abholZeitData.kosten = "5,50 EUR"

      }

      // Sonderdienst
      if(inputRadioSonderdienstStandard.checked) {
          formDataObject.sonderdienstData.sonderdienstTermin = "Standardzustellung";
          formDataObject.sonderdienstData.kosten = "0,00 EUR"
      } else if(inputRadioSonderdienstPersoenlich.checked){
          formDataObject.sonderdienstData.sonderdienstTermin = "Persönliche Zustellung";
          formDataObject.sonderdienstData.kosten = "8,50 EUR"

      } else if(inputRadioSonderdienstPersoenlichWithIdent.checked){
          formDataObject.sonderdienstData.sonderdienstTermin = "Persönliche Zustellung mit Identprüfung";
          formDataObject.sonderdienstData.kosten = "10,50 EUR"
      }

      // Sendungsdaten
      formDataObject.sendungsData.gewicht = inputSelectSendungsdatenKG.options[inputSelectSendungsdatenKG.selectedIndex].value + ",00 Kg";
      formDataObject.sendungsData.wert = inputSendungsdatenWert.value + ",00 EUR";
      if(inputRadioSendugnsdatenTransJa.checked) {
          formDataObject.sendungsDataTransportVers.transportVers = inputSendugnsdatenTrans.value + " EUR";
      }else {
          formDataObject.sendungsDataTransportVers.transportVers = "0,00 EUR";
      }
      w3.displayObject("dialogAbsender_data", formDataObject.absData);
      w3.displayObject("dialogEmpfaenger_data", formDataObject.empfData);
      w3.displayObject("dialogZustelltermin_data", formDataObject.zustellerTerminData);
      w3.displayObject("dialogAuftragswert_data", formDataObject.auftrag);
      w3.displayObject("dialogAbholzeit_data", formDataObject.abholZeitData);
      w3.displayObject("dialogSonderdienst_data", formDataObject.sonderdienstData);
      w3.displayObject("dialogSendungsdaten_data", formDataObject.sendungsData);
      w3.displayObject("dialogSsendungsDataTransportVers_data", formDataObject.sendungsDataTransportVers);
  }


}

/**
 * This function is used to validate the field after a right input is made
 *
 * @param id - id of the HTML element
 */
function validateSpecificField(id) {
    // Getter
    let inputHtmlElement = document.getElementById(id);

    // Radio buttons
    let inputRadioAuftragsbestHerr = document.getElementById('auftragsbest_herr');
    let inputRadioAuftragsbestFrau = document.getElementById('auftragsbest_frau');
    let inputRadioAuftragsbestFirma = document.getElementById('auftragsbest_firma');

    let inputRadioAuftragsbestAbs = document.getElementById('auftragsbest_absender');
    let inputRadioAuftragsbestEmpf = document.getElementById('auftragsbest_empfaenger');
    let inputRadioAuftragsbestMan = document.getElementById('auftragsbest_manuell');

    if (!inputHtmlElement.validity.valid) {
        inputHtmlElement.setAttribute("class", "invalidInputs");
    } else {
        // Check for Radio Buttons
        if (id === "auftragsbest_herr" || id === "auftragsbest_frau" || id === "auftragsbest_name"){
            inputRadioAuftragsbestHerr.classList.remove("invalidInputs");
            inputRadioAuftragsbestFrau.classList.remove("invalidInputs");
            inputRadioAuftragsbestFirma.classList.remove("invalidInputs")
        } else if(id === "auftragsbest_absender" || id === "auftragsbest_empfaenger" || id === "auftragsbest_manuell") {
            inputRadioAuftragsbestAbs.classList.remove("invalidInputs");
            inputRadioAuftragsbestEmpf.classList.remove("invalidInputs");
            inputRadioAuftragsbestMan.classList.remove("invalidInputs")
        }
        inputHtmlElement.classList.remove("invalidInputs")
    }
}

// DATA MODELS

function FormData() {
    this.absData = new AbsenderData();
    this.empfData = new EmpfData();
    this.abholZeitData = new AbholzeitData();
    this.zustellerTerminData = new ZustellerTerminData();
    this.sonderdienstData = new SonderdienstData();
    this.sendungsData = new SendungsData();
    this.auftrag = new AuftragWert();
    this.sendungsDataTransportVers = new SendugsDataTransport()
}

function AbsenderData() {
    this.absname;
    this.strHausNr;
    this.plzOrt;
    this.land;
}

function EmpfData() {
    this.empfname;
    this.strHausNr;
    this.plzOrt;
    this.land;
}
function AbholzeitData() {
    this.abholDatum;
    this.abholTermin;
}
function ZustellerTerminData() {
    this.zustellerTermin;
}
function SonderdienstData() {
    this.sonderdienstTermin;
}
function SendungsData() {
    this.gewicht;
    this.wert;
}
function AuftragWert() {
    this.auftragOhneMwst;
    this.auftragMwst;
    this.auftragMitMwst;
}
function SendugsDataTransport() {
    this.transportVers;

}
