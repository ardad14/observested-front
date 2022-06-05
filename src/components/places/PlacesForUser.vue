<template>
    <div class="container-fluid">
        <div class="row">
            <AnalyticsSidebar currentTab="places"/>
            <div class="wrapper col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div class="elements">
                    <div class="block" v-for="(place, index) in this.places" :key="index">
                        <div class="blockEl">
                            <div class="title">
                                <p>{{ place.name }}</p>
                            </div>
                            <div class="images">
                                <img @click="this.$router.push({ name: 'edit_place', params: { placeId: place.id } })" alt="Vue logo" src="../../assets/icons/icons8-редактировать-100.png">
                                <img @click="deletePlace(place.id)" alt="Vue logo" src="../../assets/icons/icons8-удалить-навсегда-96.png">
                            </div>
                        </div>
                        <div class="infoAddress">
                            <p>{{ $t("places.address") }}</p>
                            <p class="info-right">{{ place.address }}</p>
                        </div>
                        <div class="info">
                            <p>{{ $t("places.open") }}</p>
                            <p class="info-right-second">{{ place.working_hours_start }}</p>
                        </div>
                        <div class="info">
                            <p>{{ $t("places.close") }}</p>
                            <p class="info-right-second">{{ place.working_hours_end }}</p>
                        </div>
                        <button class="btn" @click="changePlace(place.id)">
                            {{ $t("places.redirect") }}
                        </button>
                    </div>
                </div>
                <div class="buttonsEl">
                    <button @click="this.$router.push('/place/create');" class="create">
                        {{ $t("places.create_place") }}
                    </button>
                    <button class="add">
                        {{ $t("places.create_from_existed") }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {deletePlace, getPlacesForUser} from "@/api";
import AnalyticsSidebar from "@/components/analytics/AnalyticsSidebar";

export default {
    name: "PlacesForUser",
    components: {
        AnalyticsSidebar,
    },
    data: () => ({
        places: []
    }),
    beforeMount() {
        if (localStorage.getItem('authToken') === null) {
            this.$router.push('/login');
            return;
        }
        getPlacesForUser(localStorage.getItem('authToken'))
            .then(response => {
                this.places = response.data.places;
                console.log(this.places)
            })
            .catch(() => {
                this.$swal({
                    position: 'top-end',
                    icon: 'error',
                    title: this.$t('something_went_wrong.title'),
                    text: this.$t('something_went_wrong.text'),
                    toast: true,
                    showConfirmButton: false,
                    timer: 4000,
                    timerProgressBar: true,
                });
            })
    },
    methods: {
        changePlace: (placeId) => {
            localStorage.setItem('actualPlaceId', placeId);
            window.location.replace('/analytics/general');
        },
        deletePlace: (placeId) => {
            deletePlace(localStorage.getItem('authToken'), placeId)
                .then(window.location.reload)
                .catch(() => {
                    this.$swal({
                        position: 'top-end',
                        icon: 'error',
                        title: this.$t('something_went_wrong.title'),
                        text: this.$t('something_went_wrong.text'),
                        toast: true,
                        showConfirmButton: false,
                        timer: 4000,
                        timerProgressBar: true,
                    });
                })
        }
    }

}
</script>

<style scoped>

.buttonsEl {
    display: flex;
    justify-content: center;
    font-family: 'Martel Sans', sans-serif;
}

.buttonsEl .create {
    background: #0052CC;
    border-radius: 52px;
    font-size: 24px;
    border: 1px solid #0052CC;
    color: white;
    cursor: pointer;
    padding: 15px;
    width: 17%;
    margin-right: 50px;
}

.buttonsEl .add {
    background: #0052CC;
    border-radius: 52px;
    font-size: 24px;
    border: 1px solid #0052CC;
    color: white;
    cursor: pointer;
    padding: 15px;
    width: 17%;
    margin-left: 50px;

}

.btn {
    background: #0052CC;
    border-radius: 52px;
    font-size: 24px;
    color: white;
    position: relative;
    left: 370px;
    cursor: pointer;
    top: -31px;
    width: 30%;
}

.block {
    background-color: #fff;
    margin-bottom: 50px;
    width: 80%;
    padding: 35px;
    border: 1px solid #808191;
    box-shadow: 0 22px 29px rgb(0 0 0 / 5%);
    border-radius: 50px;
    height: 340px;
    margin-left: 80px;
}

.title p {
    font-family: 'Martel Sans', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    color: #11142D;
}

.blockEl {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.info {
    display: flex;
    justify-content: space-between;
}

.info p {
    font-family: 'Martel Sans', sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 19px;
    color: #11142D;
}

.infoAddress {
    display: flex;
    font-family: 'Martel Sans', sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 19px;
    color: #11142D;
}

.infoAddress .info-right {
    margin-left: 82px;
}

.info .info-right-second {
    position: relative;
    right: 321px;
}

.images img {
    width: 17%;
    position: relative;
    left: 129px;
    cursor: pointer;
    margin-right: 26px;

}

.elements {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
}

.wrapper {
    margin-top: 70px;
}
</style>