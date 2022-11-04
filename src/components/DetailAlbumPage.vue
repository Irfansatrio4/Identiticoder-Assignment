<template>
    <div class="container mt-5 mb-5">
        <h1 class="d-flex justify-content-center mb-4">{{albumTitle}}'s Album</h1>
        <button class="btn btn-outline-primary mb-4 mt-5" @click="showSubmit = true">
            
Add New Photo</button>

        <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-2" id="photos">
            <!-- looping photos album -->
            <div class="col" v-for="photo in photos.slice((currentPage-1)*perPage, (currentPage-1)*perPage+perPage)" :key="photo.id" :current-page="currentPage">
                <div class="card">
                    <img :src="photo.url" :alt="photo.title">
                    <div class="card-body" style="height:100px">
                        <p class="card-title text-center">{{photo.title}}</p>
                    </div>

                </div>
            </div>
        </div>
        <div class="mt-4 d-flex justify-content-end">
            <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="photos"
            ></b-pagination>
        </div>
        <!-- Modals Submit -->
        <submit v-if="showSubmit" modalsTitle="Add New Photo">
            <form @submit.prevent="postNewPhoto"> 
                <label>Title</label>
                <input type="text" class="card-title d-flex w-100 ps-2 pe-2 mb-2" placeholder="Photo Title" v-model="newAddedPhoto.title">
                <label class="d-flex">Add Photo</label>
                <input type="file" @change="addNewImage">
                <img v-if="previewImage" :src="previewImage" class="mt-2 d-flex justify-content-center" alt="Preview Image" style="width:150px; height:150px">
                <div class="d-flex justify-content-end">
                    <button type="button" @click.prevent="close" class="btn btn-outline-danger mt-4 me-3">Cancel</button>
                    <button type="submit" class="btn btn-outline-primary mt-4">Upload</button>
                </div>
            </form>
        </submit>  
    </div>
</template>

<script>
import submit from './modal-submit.vue'
import axios from 'axios'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export default {
    name: 'DetailAlbumPage',
    components: {
        submit
    },
    data: () => ({
        photos:[],
        showSubmit : false,
        newAddedPhoto: {
            title: '',
            url: '',
            
        },
        previewImage: '',
        perPage: 10,
        currentPage: 1
    }),
   
    computed:{
        albumTitle: function(){
            return localStorage.getItem('albumTitle');
        },
        rows(){
            return this.photos.length;
        }
    },
    mounted(){
        this.getAlbumDetail()
    },
    methods:{
        getAlbumDetail(){
            const albumId = this.$route.params.albumId;
            axios.get(`${BASE_URL}/albums/`+ albumId + '/photos')
            .then(response => this.photos = response.data)
        },
        addNewImage(e){
            const photoName = e.target.files[0].name;
            this.newAddedPhoto.url = photoName;
            this.previewImage = URL.createObjectURL(e.target.files[0]);
        },
        close(){
            this.showSubmit = false;
        },
        postNewPhoto(){
            const albumId = this.$route.params.albumId
            const dataImage = {
                albumId: albumId,
                title: this.newAddedPhoto.title,
                url: this.newAddedPhoto.url,
            }
            axios.post(`${BASE_URL}/albums/`+ albumId + '/photos', dataImage)
            .then((response) => {
                if(response.status === 201){
                alert("Upload Success" + " with Status " + response.status);
                this.showSubmit = false}
            }).catch((err) => {
        console.log(err);
      });
        }
    }
}
</script>

<style>

</style>