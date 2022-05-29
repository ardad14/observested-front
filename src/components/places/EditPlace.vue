<template>
    <div class="template col-12 form-signin container justify-content-center align-content-center">
        <AnalyticsSidebar currentTab="places"/>
        <hr>
        <div class="wrapper">
            <h1 class="title text-center">{{ $t("edit_place.title") }}</h1>
            <div class="form-group mt-4">
                <label class="label" for="name">{{ $t("edit_place.name") }}:</label>
                <input v-model="name" type="text" :class="'form-control ' + formErrors.name" id="name" name="name"
                       :placeholder="$t(`edit_place.name`)">
            </div>
            <div class="form-group mt-4">
                <label class="label" for="address">{{ $t("edit_place.address") }}:</label>
                <input v-model="address" type="text" :class="'form-control ' + formErrors.address" id="address"
                       name="address" :placeholder="$t(`edit_place.address`)">
            </div>
            <div class="form-group mt-4">
                <label class="label" for="open">{{ $t("edit_place.open") }}:</label>
                <input class="time" v-model="open" type="time" :class="'form-control ' + formErrors.open"
                       id="open" name="open">
            </div>
            <div class="form-group mt-4">
                <label class="label" for="close">{{ $t("edit_place.close") }}:</label>
                <input class="time" v-model="close" type="time" :class="'form-control ' + formErrors.close"
                       id="close" name="close">
            </div>
            <div class="form-group1 text-center mt-4">
                <button @click=createPlace class="btn btn-primary" type="submit" :disabled="active">
                    {{ $t("edit_place.edit") }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import AnalyticsSidebar from "@/components/analytics/AnalyticsSidebar";
import {updatePlace, getPlaceById} from "@/api";

export default {
    name: "EditPlace",
    components: {
        AnalyticsSidebar
    },
    data: () => ({
        name: "",
        address: "",
        open: "",
        close: "",
        formErrors: {
            name: "is-invalid",
            address: "is-invalid",
            open: "is-invalid",
            close: "is-invalid",
        },
        active: true
    }),
    beforeMount() {
        if (localStorage.getItem('authToken') === null) {
            this.$router.push('/login');
            return;
        }
        console.log(this.$route.params);
        getPlaceById(localStorage.getItem('authToken'), this.$route.params.placeId)
            .then(response => {
                this.name = response.data.place.name;
                this.address = response.data.place.address;
                this.open = response.data.place.working_hours_start;
                this.close = response.data.place.working_hours_end;
            })
            .catch(response => console.log(response.data))
    },
    updated() {
        let errors = Object.values(this.formErrors);
        this.active = errors.includes("is-invalid")
    },
    methods: {
        createPlace() {
            updatePlace(
                localStorage.getItem('authToken'),
                {
                    'name': this.name,
                    'address': this.address,
                    'working_hours_start': this.open,
                    'working_hours_end': this.close,
                },
                this.$route.params.placeId
            )
                .then(() => {
                    this.$router.push('/places');
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
        address() {
            this.formErrors.address = "is-valid";
            if (this.address.length < 4 || this.address.length > 32) {
                this.formErrors.address = "is-invalid";
            }
        },
        open() {
            this.formErrors.open = "is-valid";
            if (this.open.length === 0) {
                this.formErrors.open = "is-invalid";
            }
        },
        close() {
            this.formErrors.close = "is-valid";
            if (this.close.length === 0) {
                this.formErrors.close = "is-invalid";
            }
        }
    },
}
</script>

<style scoped>
.template {
    min-height: 105vh;
    margin-top: -10px;
}


.wrapper {
    background: #FFFFFF;
    width: 600px;
    height: 750px;
    margin: -613px 0 0 765px;
    padding: 20px;
    border: 1px solid #808191;
    box-shadow: 0 22px 29px rgb(0 0 0 / 5%);
    border-radius: 50px;
}

.title {
    font-style: normal;
    font-weight: 700;
    font-size: 33px;
    line-height: 91px;
    position: relative;
    letter-spacing: 4px;
    font-family: 'Martel Sans', sans-serif;
    color: #11142D;
}


.form-group input {
    width: 480px;
    background-color: #F2F6FC;
    margin: 0 auto;
    font-family: 'Martel Sans', sans-serif;
    font-size: 24px;
    border-radius: 15px;
    letter-spacing: 2px;
}

.form-group .time {
    width: 40%;
    margin-left: 40px;
}

.label {
    font-size: 22px;
    position: relative;
    letter-spacing: 2px;
    left: 43px;
    font-family: 'Martel Sans', sans-serif;

}

.btn {
    background-color: #0052CC;
    font-family: 'Martel Sans', sans-serif;
    width: 190px;
    letter-spacing: 3px;
    color: white;
    font-size: 24px;
    margin-top: 50px;
    border-radius: 20px;
    cursor: pointer;
}

h5 {
    font-family: 'Martel Sans', sans-serif;
    letter-spacing: 3px;
}

h6 a {
    color: black;
    text-decoration: underline;;
}

hr {
    transform: rotate(90deg);
    position: relative;
    left: -625px;
    margin-top: 0;
}

select {
    width: 480px;
    position: relative;
    left: -27px;
    border-radius: 17px;
    background-color: #F2F6FC;
    font-size: 20px;
    padding: 5px;
    margin-top: 35px;
}

.labelSelect {
    position: relative;
    font-size: 22px;
    letter-spacing: 2px;
    left: 43px;
    top: -45px;
    margin-bottom: 5px;
    font-family: 'Martel Sans', sans-serif;
}
</style>