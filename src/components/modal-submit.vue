<template>
    <div class="modals-submit">
        <div class="d-flex flex-column col-md-6 modals-main p-4">
            <div class="d-flex mb-3 post">
              <h5 >{{modalsTitle}}</h5>
            </div>
            <div>
                <slot/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        modalsTitle: {
            type: String
        },
    },
}
</script>

<style scoped>
.modals-submit{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1;
    justify-content: center;
    min-height: 100vh;
    display: flex;
    align-items: center;
    background-color: rgba(5, 5, 5, 0.2);
}
.modals-main{
    margin: auto;
    background: white;
    border-radius: 5px;
}
.post{
    border-bottom: 3px solid black;
}
</style>