import {FormControl} from '@angular/forms';

export interface FormSettings {
    type:           string
    name:           string
    label:          string
    maxChars?:      number
    hintLabel?:     string
    placeHolder?:   string
    form:           FormControl
}
