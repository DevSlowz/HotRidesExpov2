import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/App.vue'
import LoginView from '../views/Login.vue'
import Register from '../views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/home-page',
      name: 'homePage',
      component: () => import('../views/HomePage.vue')
    },
    {
      path: '/event-details',
      name: 'eventDetails',
      component: () => import('../views/EventDetails.vue')
    },
    {
      path: '/payment-details',
      name: 'paymentDetails',
      component: () => import('../views/PaymentDetails.vue')
    },
    {
      path: '/event-registration',
      name: 'eventRegistration',
      component: () => import('../views/EventRegistration.vue')
    },
    {
      path: '/registered-events',
      name: 'registeredEvents',
      component: () => import('../views/RegisteredEvents.vue')
    },
    {
      path: '/vehicle-list',
      name: 'vehicleList',
      component: () => import('../views/VehicleList.vue')
    },
    {
      path: '/payment-history',
      name: 'paymentHistory',
      component: () => import('../views/PaymentDetails/PaymentHistory.vue')
    },
    {
      path: '/payment-methods',
      name: 'paymentMethods',
      component: () => import('../views/PaymentDetails/PaymentMethod.vue')
    },
    {
      path: '/payment',
      name: 'Payment',
      component: () => import('../views/PaymentView.vue'),
      props: (route) => ({
        firstName: route.params.firstName,
        lastName: route.params.lastName,
        tshirtSize: route.params.tshirtSize,
        clubMembership: route.params.clubMembership,
        selectedEvent: route.params.selectedEvent,
        eventDate: route.params.eventDate
      })
    },
    {
      path: '/host-dashboard',
      name: 'HostDashboard',
      component: () => import('../views/Host/HostDashboard.vue')
    },
    {
      path: '/host-event',
      name: 'EventCreate',
      component: () => import('../views/Host/HostEvent.vue')
    },
    {
      path: '/host-event-details',
      name: 'HostEventDetails',
      component: () => import('../views/Host/HostEventDetails.vue')
    },
    {
      path: '/host-event-finance',
      name: 'EventFinance',
      component: () => import('../views/Host/HostFinancials.vue')
    },
    {
      path: '/user-type',
      name: 'userType',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Registration/RegistrationUserType.vue')
    }
  ]
})

export default router
