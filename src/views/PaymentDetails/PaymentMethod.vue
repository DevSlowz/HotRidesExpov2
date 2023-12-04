<template>
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-semibold mb-6 text-gray-800">Payment Methods</h1>
      <button
        @click="showAddCardModal = true"
        class="mb-6 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-blue-700 rounded"
      >
        Add Card
      </button>
  
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div
          class="bg-white rounded-lg shadow p-4"
          v-for="card in cards"
          :key="card.card_id"
        >
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-xl font-semibold mb-2">{{ card.card_holder }}</h2>
              <p class="text-gray-700">{{ card.card_number }}</p>
              <p class="text-gray-700">{{ card.expiry_date }}</p>
            </div>
          </div>
        </div>
      </div>
  
      <transition name="fade">
        <div 
          v-if="showAddCardModal" 
          class="fixed inset-0 bg-black bg-opacity-50 h-full w-full flex justify-center items-center"
        >
          <div class="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
            <h3 class="text-lg font-semibold mb-4">Add New Card</h3>
            <form @submit.prevent="addCard">
              <label for="cardHolder" class="block text-sm font-medium text-gray-700">Card Holder</label>
              <input type="text" v-model="newCard.card_holder" class="mt-1 mb-4 p-2 border rounded w-full" />
  
              <label for="cardNumber" class="block text-sm font-medium text-gray-700">Card Number</label>
              <input type="text" v-model="newCard.card_number" class="mt-1 mb-4 p-2 border rounded w-full" />
  
              <label for="expiryDate" class="block text-sm font-medium text-gray-700">Expiry Date</label>
              <input type="text" v-model="newCard.expiry_date" class="mt-1 mb-6 p-2 border rounded w-full" />
  
              <div class="flex justify-end">
                <button
                  @click="showAddCardModal = false"
                  type="button"
                  class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white rounded"
                >
                  Add Card
                </button>
              </div>
            </form>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cards: [],
        showAddCardModal: false,
        newCard: {
          card_holder: '',
          card_number: '',
          expiry_date: ''
        }
      };
    },
    methods: {
      addCard() {
        // Add validation and logic to push the card to a server or local state
        this.cards.push({
          ...this.newCard,
          card_id: Date.now() // a pseudo-unique identifier for example purposes
        });
        this.resetNewCard();
        this.showAddCardModal = false;
      },
      resetNewCard() {
        this.newCard = {
          card_holder: '',
          card_number: '',
          expiry_date: ''
        };
      }
    }
  };
  </script>
  
  <style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }
  </style>
  