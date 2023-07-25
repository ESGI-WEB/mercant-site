<template>
    <div class="card">
        {{ product }}
        <div class="image">
            <img :src="product.image" alt="Product Image" />
        </div>
        <div class="title-section">
            <div class="title-yacht">
                {{ product.title.toUpperCase() }}
            </div>
            <div>
                EUR {{ product.price }}
            </div>
        </div>

        <div>
            {{ product.description }}
        </div>
    </div>
</template>

<script setup>

const props = defineProps(['product']);

</script>

<style scoped>

.card {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.title-section {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.image {
    height: 300px;
}

.image > img {
    object-fit: cover;
    width: 100%;
    height: 100%;
}

.title-yacht {
    font-family: 'Mark-Bold', sans-serif;
}
</style>
