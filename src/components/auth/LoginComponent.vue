<template>
    <div class="d-flex col-12 form-signin container justify-content-center align-content-center mt-5">
        <div>
        <h1 class="h3 mb-3 fw-normal text-center">{{ $t("login.login") }}</h1>
        <div class="form-group mt-4">
            <label for="email">{{ $t("login.mail") }}:</label>
            <input v-model="email" type="email" :class="'form-control ' + formErrors.email" id="email" name="email" placeholder="name@example.com">
        </div>
        <div class="form-group mt-4">
            <label for="password">{{ $t("login.password") }}:</label>
            <input v-model="password" type="password" :class="'form-control ' + formErrors.password" id="password" name="password" :placeholder="$t(`login.password`)">
        </div>
        <div class="form-group1 text-center mt-4">
            <button @click=login class="btn btn-primary" type="submit" :disabled="active">{{ $t("login.login") }}</button>
        </div>
        <div class="form-group1 text-center mt-4">
            <h5>{{ $t("login.don`t_have_account") }}</h5>
            <h6><a href="/register" class="text-decoration-none">{{ $t("login.create_account") }}</a></h6>
        </div>
        </div>
    </div>
</template>

<script>
import {login} from "@/api";

export default {
    name: "LoginComponent",
    data: () => ({
        email: "",
        password: "",
        formErrors: {
            email: 'is-invalid',
            password: 'is-invalid'
        },
        active: 'true'
    }),
    updated() {
        let errors = Object.values(this.formErrors);
        this.active = errors.includes("is-invalid")
    },
    methods: {
        login() {
            login({
                'email': this.email,
                'password': this.password,
            })
                .then(response => {
                    this.$root.user = response.data.user;
                    localStorage.setItem('authToken', response.data.token);
                    localStorage.setItem('authTokenDate', new Date().toISOString());
                    localStorage.setItem('role', response.data.user.role);
                })
                .catch(e => {
                    console.log(e)
                })
        }
    },
    watch: {
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
        },
    },
}
</script>

<style scoped>

</style>