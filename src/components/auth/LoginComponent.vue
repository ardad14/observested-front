<template>
    <div class="d-flex col-12 form-signin container justify-content-center align-content-center mt-5">
        <form action="/signUpService" method="post">
            <h1 class="h3 mb-3 fw-normal text-center">Увійти</h1>
            <div class="form-group mt-4">
                <label for="email">Пошта:</label>
                <input v-model="email" type="email" :class="'form-control ' + formErrors.email" id="email" name="email" placeholder="name@example.com">
            </div>
            <div class="form-group mt-4">
                <label for="password">Пароль:</label>
                <input v-model="password" type="password" :class="'form-control ' + formErrors.password" id="password" name="password" placeholder="Пароль">
            </div>
            <div class="form-group mt-4">
                <label for="place">Заклад:</label>
                <input v-model="place" type="text" class="form-control" id="place" name="place" placeholder="Назва закладу">
            </div>
            <div class="form-group1 text-center mt-4">
                <button class="btn btn-primary" type="submit" :disabled="active">Увійти</button>
            </div>
            <div class="form-group1 text-center mt-4">
                <h5>Ще не створили свій заклад?</h5>
                <h6><a href="/createPlace" class="text-decoration-none">Створіть заклад</a></h6>
            </div>
            <div class="form-group1 text-center mt-4">
                <h5>Ще не маєте акаунт?</h5>
                <h6><a href="/signIn" class="text-decoration-none">Сторвити акаунт</a></h6>
            </div>
        </form>
    </div>
</template>

<script>
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
    watch: {
        /*email() {
            this.formErrors.email = "is-valid";
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))) {
                this.formErrors.email = "is-invalid";
            }
        },*/
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