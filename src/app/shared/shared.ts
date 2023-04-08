// import jwt_decode from "jwt-decode";

import Swal from 'sweetalert2'
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})


export function showError(error: any, status: any, table: string[], allErrors: any) {
    if (error && status == 400) {
        table = allErrors
    }
    else if (status == 500) {
        SwallModal('error', 'Erreur', "Veuillez contacter l'administrateur")
    }
}


export function SwallModal(icons: any, title: string, message: string) {
    Swal.fire({
        icon: icons,
        title: title,
        text: message,
        // footer: '<a href="">Why do I have this issue?</a>'
    })
}


export function toastShow(icon: any, message: string) {
    Toast.fire({
        icon: icon,
        title: message
    })
}


export const statuts = ["lu", "non lu", "en attente de réponse"]
export const roles = ["Root", "admin", "Validator", "Viewer", "Seller"]
export const stateCommande = ['ouvert', 'en cours', 'payé', 'livré']
