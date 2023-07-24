<template>
    <div class="image-item">
        <img :src="product.image" alt="Product Image" />
    </div>
    <div class="description-item">
        <div class="title-item-yacht">
            {{ product.title.toUpperCase() }}
        </div>
        <div class="title-item">
            <div>
                {{ product.description }}
            </div>
            <div>
                x {{ product.quantity }}
            </div>
        </div>
        <div class="price-item">
            {{ product.price }} EUR
        </div>
    </div>
</template>

<script setup>

const props = defineProps(['product']);

</script>

<style scoped>

.title-item {
    display: flex;
    flex-direction: row;
    gap: 5px;
    justify-content: space-between;

    > div:last-child {
        font-family: Mark-Thin;
    }
}

.image-item {
    width: 200px;
}

.image-item > img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 18px 0 0 18px;
}

.title-item-yacht {
    font-family: 'Mark-Bold', sans-serif;
}

.description-item {
    width: calc(100% - 220px);
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: space-between;
}

.price-item {
   font-family: Mark-Bold;
}

</style>
