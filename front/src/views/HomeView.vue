<script setup>

</script>

<template>
    <div class="filter">
        <div class="name">
            <p>Name of yacht</p>
            <input placeholder="Enter the name of the yacht"/>
        </div>
        <div class="price">
            <p>Price</p>

        </div>
    </div>

</template>

<style scoped>

    .filter {
        background-color: #1f2833;
        display: flex;
        padding: 30px;
        gap: 100px;
        color: white;
    }

    p {
        font-size: 1.5rem;
    }

    input {
        background: transparent;
        border-bottom: 1px solid;
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-color: white;
        width: 400px;
        padding-bottom: 5px;

        &:hover {
            cursor: text;
        }
    }

    ::placeholder {
        color: white;
        opacity: 1;
        font-family: Mark-Thin;
    }

    .name, .price {
        display: flex;
        flex-direction: column;
        gap:5px;
    }

</style>