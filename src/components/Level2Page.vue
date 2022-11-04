<template>
    <div class="container mt-5 mb-5">
        <h3 class="mt-4 mb-5 ps-2">{{getName}}'s Album and Post</h3>
        <div class="d-flex flex-row align-items-center">
            <div>
                <b-dropdown id="dropdown" text="Album or Post" variant="outline-primary" class="m-md-2">
                    <b-dropdown-item @click="dataPosts = true; getUserAlbum()">Album</b-dropdown-item>
                    <b-dropdown-item @click="dataPosts = false; getUserPosts()">Post</b-dropdown-item>
                </b-dropdown>
            </div>
        </div>
        <div v-show="dataPosts">
            <h5 class="mt-4 mb-2 ps-2"> Album </h5>
            <table class="table mt-4">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">See Album</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="album in albums" :key="album.id">
                        <td>{{album.title}}</td>
                        <td style="cursor:pointer" @click="detailAlbum(album)"><a class="DetailAlbum" >Album Detail</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-show="!dataPosts">
            <h5 class="mt-4 mb-2 ps-2"> Post</h5>
            <div class="row row-cols-1 row-cols-lg-2 g-2 g-lg-2 mt-4">
            <div class="mb-2" v-for="post in posts" :key="post.id">
                <div class="card-post">
                    <b-card no-body class="overflow-hidden" style="max-width: 640px;">
                        <b-row no-gutters>
                        <b-col md="6">
                            <b-card-img src="https://picsum.photos/400/400/?image=7" alt="Image" class="rounded-0"></b-card-img>
                        </b-col>
                        <b-col md="6">   
                            <b-card-body>
                                <h4 class="card-title">{{post.title}}</h4>
                                <b-card-text v-if="post.body.length>=100">
                                    {{post.body.substring(0,100)+"..."}}
                                </b-card-text>
                            </b-card-body>
                            <button type="button" class="btn btn-outline-primary" style="cursor:pointer; position: absolute; bottom: 15px; right: 15px;" @click="editPost(post)">Edit Post</button>
                        </b-col>
                        </b-row>
                    </b-card>
                </div>
            </div>
        </div>
        </div>

        <!-- Modals update post -->
        <submit v-if="showSubmit" modalsTitle="Update Post">
            <form @submit.prevent="updatePost">
                <label class="pb-2">Title</label>
                <input type="text" class="d-flex w-100 ps-2 pe-3 mb-3" v-model="post.title">
                <label>Body</label>
                <textarea rows= "4" type="text" class="card-text d-flex w-100 ps-2 pe-2" v-model="post.body"></textarea>
                <div class="d-flex justify-content-end">
                    <button type="button" @click.prevent="close" class="btn btn-outline-danger mt-4 me-3">Cancel</button>
                    <button type="submit" class="btn btn-outline-primary mt-4">Update</button>
                </div>
            </form>
        </submit>          
    </div>
</template>

<script>
import submit from './modal-submit.vue'
import axios from "axios"

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export default {
    name: 'Level2Page',
    components: {
        submit
    },
    data: () => ({
        albums: [],
        posts: [],
        dataPosts : true,
        showSubmit: false,
        post: {
            id: '',
            title: '',
            body: '',
            userId: ''
        },
    }),
    computed:{
        getName: function(){
            return localStorage.getItem('userName')
        }
    },
    mounted(){
        this.getUserAlbum();
    },
    methods: {
        getUserAlbum(){
            const userId = this.$route.params.userId;
            axios.get(`${BASE_URL}/users/` + userId + '/albums')
            .then(response => this.albums = response.data)
        },
        detailAlbum(album){
            localStorage.setItem('albumTitle', album.title);
            this.$router.push({name: 'DetailAlbumPage', params: {userId: album.userId, albumId: album.id}});
        },
        getUserPosts(){
            const userId = this.$route.params.userId;
            axios.get(`${BASE_URL}/users/` + userId + '/posts')
            .then(response => this.posts = response.data)
        },
        editPost(post){
            this.showSubmit = true;
            this.post.userId = post.userId;
            this.post.id = post.id;
            this.post.body = post.body;
            this.post.title = post.title;
        },
        close(){
            this.showSubmit = false;
        },
        updatePost(){
            const dataPost = {
                id: this.post.id,
                title: this.post.title,
                body: this.post.body,
                userId: this.post.userId
            }
            axios.put(`${BASE_URL}/posts/`+ this.post.id, dataPost)
            .then((response) => {
                if(response.status === 200){
                alert("Edit Success" + " with Status " + response.status);
                this.showSubmit = false}
            }).catch((err) => {
        console.log(err);
      });
        }
    }
}
</script>

<style scoped>
.DetailAlbum{
    color: black;
    text-decoration: none;
}
</style>