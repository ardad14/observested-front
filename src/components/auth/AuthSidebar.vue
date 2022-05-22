<template>
    <div>
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block sidebar collapse">
            <div class="title">
                <img alt="Vue logo" src="../../assets/image_2022-05-19_16-23-21.png">
                <h2>Observested</h2>
            </div>
            <hr>
            <div class="language">
                <img alt="Vue logo" src="../../assets/icons8-география.png">
                <div class="dropdown">
                    <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1"
                            data-bs-toggle="dropdown" aria-expanded="false">
                        {{ $t("navbar.language") }}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item" href="#" @click="setLocale('uk')">ua</a></li>
                        <li><a class="dropdown-item" href="#" @click="setLocale('en-gb')">en</a></li>
                    </ul>
                </div>
            </div>


        </nav>
    </div>

</template>

<script>
export default {
    name: "AuthSidebar",
    props: {
        currentTab: String
    },
    methods: {
        setLocale: function (locale) {
            localStorage.setItem('locale', locale);
            window.location.reload();
        }
    }
}
</script>

<style scoped>
.current {
    background-color: #bdbdbd;
    border-left: 1px solid #CCC
}

.title {
    display: flex;
    justify-content: space-evenly;
    margin-top: 30px;
}

.title img {
    width: 50px;
}

#sidebarMenu {
    position: fixed;
    top: 0;
    left: 0;

}

.title h2 {
    position: relative;
    top: 11px;
    left: 5px;
}

.language {
    margin-top: 40px;
    display: flex;
}

.language img {
    color: black;
    width: 50px;
}

.btn {
    background-color: transparent;
    font-size: 22px;
    position: relative;
    top: 10px;
}

.dropdown-item {
    background-color: transparent;
    border: none;
}


</style>
