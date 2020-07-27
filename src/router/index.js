import Vue from 'vue'
import VueRouter from 'vue-router'
import Application from '../views/layouts/application.vue'
import Registration from '../views/layouts/registration.vue'

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Application,
    meta: {
      secure: true
    },
    children: [
      {
        path: '',
        redirect: 'home'
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/pages/application/home/index.vue')
      },
      {
        path: 'meetings',
        name: 'meetings',
        component: () => import('../views/pages/application/meetings/index.vue')
      },
      {
        path: 'meetings/create',
        name: 'meeting-create',
        component: () => import('../views/pages/application/meetings/create.vue')
      },
      {
        path: 'meetings/show/:id',
        name: 'meeting-show',
        component: () => import('../views/pages/application/meetings/show.vue')
      },
      {
        path: 'meetings/voting/:id',
        name: 'voting',
        component: () => import('../views/pages/application/meetings/voting.vue')
      },
      {
        path: 'meetings/voting-result/:id',
        name: 'voting-result',
        component: () => import('../views/pages/application/meetings/votingResult.vue')
      },
      {
        path: 'meetings/voting-result/:id',
        name: 'voting-result',
        component: () => import('../views/pages/application/meetings/votingResult.vue')
      },
      {
        path: 'boards-committees',
        name: 'boards-committees',
        component: () => import('../views/pages/application/boards-committees/index.vue')
      },
      {
        path: 'boards-committees/secretary-board-show/:id',
        name: 'secretary-board-show',
        component: () => import('../views/pages/application/boards-committees/secretary-board-show/show.vue'),
        children: [
          {
            path: '',
            redirect: 'info'
          },
          {
            path: 'info',
            name: 'info',
            component: () => import('../views/pages/application/boards-committees/secretary-board-show/sub/info.vue')
          },
          {
            path: 'members',
            name: 'members',
            component: () => import('../views/pages/application/boards-committees/secretary-board-show/sub/members.vue')
          },
          {
            path: 'powers',
            name: 'powers',
            component: () => import('../views/pages/application/boards-committees/secretary-board-show/sub/powers.vue')
          },
          {
            path: 'settings',
            name: 'settings',
            component: () => import('../views/pages/application/boards-committees/secretary-board-show/sub/settings.vue')
          },
        ]
      },
      {
        path: 'boards-committees/committee-show/:id',
        name: 'committee-show',
        component: () => import('../views/pages/application/boards-committees/committee-show/show.vue'),
        children: [
          {
            path: '',
            redirect: 'info'
          },
          {
            path: 'info',
            name: 'info',
            component: () => import('../views/pages/application/boards-committees/committee-show/sub/info.vue')
          },
          {
            path: 'members',
            name: 'members',
            component: () => import('../views/pages/application/boards-committees/committee-show/sub/members.vue')
          },
          {
            path: 'powers',
            name: 'powers',
            component: () => import('../views/pages/application/boards-committees/committee-show/sub/powers.vue')
          },
          {
            path: 'settings',
            name: 'settings',
            component: () => import('../views/pages/application/boards-committees/committee-show/sub/settings.vue')
          },
        ]
      },
      {
        path: 'boards-committees/secretary-board-create/0/',
        name: 'board-create',
        component: () => import('../views/pages/application/boards-committees/secretary-board-create/create.vue'),
        children: [
          {
            path: '',
            redirect: 'info'
          },
          {
            path: 'info',
            name: 'info',
            component: () => import('../views/pages/application/boards-committees/secretary-board-create/sub/info.vue')
          },
          {
            path: 'members',
            name: 'members',
            component: () => import('../views/pages/application/boards-committees/secretary-board-create/sub/members.vue')
          },
          {
            path: 'powers',
            name: 'powers',
            component: () => import('../views/pages/application/boards-committees/secretary-board-create/sub/powers.vue')
          },
          {
            path: 'settings',
            name: 'settings',
            component: () => import('../views/pages/application/boards-committees/secretary-board-create/sub/settings.vue')
          },
        ]
      },
      {
        path: 'boards-committees/secretary-board-update/:id',
        name: 'board-update',
        component: () => import('../views/pages/application/boards-committees/secretary-board-update/update.vue'),
        children: [
          {
            path: '',
            redirect: 'info'
          },
          {
            path: 'info',
            name: 'info',
            component: () => import('../views/pages/application/boards-committees/secretary-board-update/sub/info.vue')
          },
          {
            path: 'members',
            name: 'members',
            component: () => import('../views/pages/application/boards-committees/secretary-board-update/sub/members.vue')
          },
          {
            path: 'powers',
            name: 'powers',
            component: () => import('../views/pages/application/boards-committees/secretary-board-update/sub/powers.vue')
          },
          {
            path: 'settings',
            name: 'settings',
            component: () => import('../views/pages/application/boards-committees/secretary-board-update/sub/settings.vue')
          },
        ]
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('../views/pages/application/users/index.vue'),
        children: [
          {
            path: '',
            redirect: 'activated'

          },
          {
            path: 'activated',
            name: 'activated',
            component: () => import('../views/pages/application/users/sub/activated.vue')
          },
          {
            path: 'non-activated',
            name: 'non-activated',
            component: () => import('../views/pages/application/users/sub/nonActivated.vue')
          }
        ]
      },
      {
        path: 'my-account',
        name: 'my-account',
        component: () => import('../views/pages/application/my-account/index.vue'),
        children: [
          {
            path: '',
            redirect: 'personal-info'
          },
          {
            path: 'personal-info',
            name: 'personal-info',
            component: () => import('../views/pages/application/my-account/sub/personalInfo.vue')
          },
          {
            path: 'password',
            name: 'password',
            component: () => import('../views/pages/application/my-account/sub/password.vue')
          },
          {
            path: 'the-secretary',
            name: 'the-secretary',
            component: () => import('../views/pages/application/my-account/sub/theSecretary.vue')
          },
          {
            path: 'boards-committees',
            name: 'boards-committees',
            component: () => import('../views/pages/application/my-account/sub/boardsCommittees.vue')
          },

        ]
      }
    ]
  },
  {
    path: '/',
    component: Registration,
    meta: {
      nonsecure: true
    },
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('../views/pages/registration/login.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('../views/pages/registration/register.vue')
      },
      {
        path: 'company-name',
        name: 'company-name',
        component: () => import('../views/pages/registration/companyName.vue')
      },
      {
        path: 'forget-password',
        name: 'forget-password',
        component: () => import('../views/pages/registration/forgetPassword.vue')
      },
      {
        path: 'active-account',
        name: 'active-account',
        component: () => import('../views/pages/registration/activeAccount.vue')
      },
    ]
  },
  {
    path: '*',
    redirect: 'home'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
