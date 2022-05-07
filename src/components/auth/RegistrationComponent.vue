<template>
    <div class="d-flex col-12 form-signin container justify-content-center align-content-center mt-5">
        <div>
            <h1 class="h3 mb-3 fw-normal text-center">{{ $t("register.register") }}</h1>
            <div class="form-group mt-4">
                <label for="name">{{ $t("register.name") }}:</label>
                <input v-model="name" type="text" :class="'form-control ' + formErrors.name" id="name" name="name"
                       :placeholder="$t(`register.name`)">
            </div>
            <div class="form-group mt-4">
                <label for="surname">{{ $t("register.surname") }}:</label>
                <input v-model="surname" type="text" :class="'form-control ' + formErrors.surname" id="surname"
                       name="surname" :placeholder="$t(`register.surname`)">
            </div>
            <div class="form-group mt-4">
                <label for="email">{{ $t("register.mail") }}:</label>
                <input v-model="email" type="email" :class="'form-control ' + formErrors.email" id="email" name="email"
                       placeholder="name@example.com">
            </div>
            <div class="form-group mt-4">
                <label for="password">{{ $t("register.password") }}:</label>
                <input v-model="password" type="password" :class="'form-control ' + formErrors.password" id="password"
                       name="password" :placeholder="$t(`register.surname`)">
            </div>
            <div class="form-group mt-4">
                <label for="role">{{ $t("register.role") }}:</label>
                <select v-model="role" name="role" id="role" class="form-select">
                    <option value="admin" selected>{{ $t("register.roles.admin") }}</option>
                    <option value="manager">{{ $t("register.roles.manager") }}</option>
                    <option value="worker">{{ $t("register.roles.worker") }}</option>
                </select>
            </div>
            <div class="form-group1 text-center mt-4">
                <button @click=register class="btn btn-primary" type="submit" :disabled="active">
                    {{ $t("register.register") }}
                </button>
            </div>
            <div class="form-group1 text-center mt-4">
                <h5>{{ $t("register.already_has_account") }}</h5>
                <h6><a href="/login" class="text-decoration-none">{{ $t("register.login") }}</a></h6>
            </div>
        </div>
    </div>
</template>

<script>
import {register} from "@/api";

export default {
    name: "RegistrationComponent",
    data: () => ({
        name: "",
        surname: "",
        email: "",
        password: "",
        role: "",
        formErrors: {
            name: "is-invalid",
            surname: "is-invalid",
            email: "is-invalid",
            password: "is-invalid",
        },
        active: true
    }),
    updated() {
        let errors = Object.values(this.formErrors);
        this.active = errors.includes("is-invalid")
    },
    methods: {
        register() {
            register({
                'name': this.name,
                'surname': this.surname,
                'email': this.email,
                'password': this.password,
                'role': this.role,
            })
                .then(response => {
                    console.log(response.data)
                })
                .catch(e => {
                    console.log(e)
                })
        }
    },
    watch: {
        name() {
            this.formErrors.name = "is-valid";
            if (this.name.length < 3 || this.name.length > 32) {
                this.formErrors.name = "is-invalid";
            }
        },
        surname() {
            this.formErrors.surname = "is-valid";
            if (this.surname.length < 4 || this.surname.length > 32) {
                this.formErrors.surname = "is-invalid";
            }
        },
        email() {
            this.formErrors.email = "is-valid";
            if (!(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(this.email))) {
                this.formErrors.email = "is-invalid";
            }
        },
        password() {
            this.formErrors.password = "is-valid";
            if ((this.password.length < 5) || !(/[a-zA-Z0-9]/.test(this.password))) {
                this.formErrors.password = "is-invalid";
            }
        }
    },
}
</script>

<style scoped>

</style>