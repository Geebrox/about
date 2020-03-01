if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('../serviceWorker.js')
    .then(reg => {
      // регистрация сработала
      console.log('Registration succeeded. Scope is ' + reg.scope)
    })
    .catch(error => {
      // регистрация прошла неудачно
      console.log('Registration failed with ' + error)
    })
}

var triangleStyleList = [
  [
    {
      top: '-242px',
      left: '-212px',
      transform: 'rotate(10deg)'
    },
    {
      top: 'calc(100% - 300px)',
      left: '-212px',
      transform: 'rotate(150deg)'
    },
    {
      top: 'calc(100% - 300px)',
      left: 'calc(100% - 300px)',
      transform: 'rotate(270deg)'
    },
    {
      top: 'calc(100% - 300px)',
      left: 'calc(100% - 300px)',
      transform: 'rotate(155deg)'
    }
  ],
  [
    {
      bottom: '-202px',
      right: '-102px',
      transform: 'rotate(-130deg)'
    },
    {
      bottom: 'calc(100% - 200px)',
      right: '-102px',
      transform: 'rotate(-70deg)'
    },
    {
      bottom: 'calc(100% - 250px)',
      right: 'calc(100% - 250px)',
      transform: 'rotate(140deg)'
    },
    {
      bottom: 'calc(100% - 250px)',
      right: 'calc(100% - 250px)',
      transform: 'rotate(200deg)'
    }
  ]
]

var triangle_1 = document.getElementById('triangle_1')
var triangle_2 = document.getElementById('triangle_2')
var menuDot = document.getElementById('menuDot')
var menu = document.getElementById('menu')
var menuDotMoving = false
var isMenuMinized = window.innerWidth <= 700
var nav = document.getElementById('nav')

new fullpage('#fullPage', {
  anchors: ['home', 'aboutUs', 'services', 'contact'],
  navigation: true,
  menu: '#menu',
  onLeave: function(origin, destination, direction) {
    setElementStyle(triangle_1, triangleStyleList[0][destination.index])
    setElementStyle(triangle_2, triangleStyleList[1][destination.index])
    menuDotMoving = true
    setTimeout(setMenuDotToCenter, 200)

    if (destination.index === 1) {
      var sectionTitle = document.getElementById('animatedTitle')
      var sectionDescription = document.getElementById('animatedDescription')

      sectionTitle.classList.add('active')
      sectionDescription.classList.add('active')
    } else if (origin.index === 1) {
      var sectionTitle = document.getElementById('animatedTitle')
      var sectionDescription = document.getElementById('animatedDescription')

      sectionTitle.classList.remove('active')
      sectionDescription.classList.remove('active')
    }
    if (destination.index === 2) {
      var sectionTitle = document.getElementById('animatedTitle_2')

      sectionTitle.classList.add('active')
      animateCards(true)
    } else if (origin.index === 2) {
      var sectionTitle = document.getElementById('animatedTitle_2')

      sectionTitle.classList.remove('active')
      animateCards(false)
    }
    if (destination.index === 3) {
      var sectionTitle = document.getElementById('animatedTitle_3')
      var sectionContacts = document.getElementById('sectionContacts')

      sectionContacts.classList.add('active')
      sectionTitle.classList.add('active')

      setTimeout(function() {
        nav.style.filter = 'invert(100%)'
      }, 350)
    } else if (origin.index === 3) {
      var sectionTitle = document.getElementById('animatedTitle_3')
      var sectionContacts = document.getElementById('sectionContacts')

      sectionContacts.classList.remove('active')
      sectionTitle.classList.remove('active')
      nav.style.filter = 'invert(0)'
    }
  },
  afterRender: function() {
    setElementStyle(triangle_1, triangleStyleList[0][0])
    setElementStyle(triangle_2, triangleStyleList[1][0])
    menuDotMoving = true
    setMenuDotToCenter()

    document.body.onresize = function(e) {
      if (e.target.innerWidth <= 700 && !isMenuMinized) {
        isMenuMinized = true
        menuDotMoving = true
        setTimeout(setMenuDotToCenter, 200)
      } else if (e.target.innerWidth > 700 && isMenuMinized) {
        isMenuMinized = false
        menuDotMoving = true
        setTimeout(setMenuDotToCenter, 200)
      }
    }
  }
})

function animateCards(activate) {
  var cards = document.getElementsByClassName('card-container')

  for (var i = 0; i < cards.length; i++) {
    if (activate) {
      setTimeout(
        function(card) {
          card.classList.add('active')
        },
        (i + 1) * 300,
        cards[i]
      )
    } else {
      cards[i].classList.remove('active')
    }
  }
}

function onMenuItemHover(el) {
  if (menuDotMoving) {
    menuDotMoving = false
  }

  var menuRect = menu.getBoundingClientRect()
  var elRect = el.getBoundingClientRect()
  menuDot.style.left = elRect.left + elRect.width / 2 - menuRect.left + 'px'
  menuDot.style.top = elRect.top + elRect.height + 10 - menuRect.top + 'px'

  el.onmouseleave = function() {
    menuDotMoving = true
    setTimeout(setMenuDotToCenter, 200)
  }
}

function setMenuDotToCenter() {
  if (menuDotMoving) {
    menuDotMoving = false
    var activeItem = document.getElementsByClassName('menu-item active')[0]
    var activeRect = activeItem.getBoundingClientRect()
    var menuRect = menu.getBoundingClientRect()
    menuDot.style.left =
      activeRect.left + activeRect.width / 2 - menuRect.left + 'px'
    menuDot.style.top =
      activeRect.top + activeRect.height + 10 - menuRect.top + 'px'
  }
}

function setElementStyle(el, style) {
  for (prop of Object.keys(style)) {
    el.style[prop.toString()] = style[prop.toString()]
  }
}

function toggleNav() {
  var navToggler = document.getElementById('navToggler')
  navToggler.classList.toggle('active')
  var menuContainer = document.getElementById('menuContainer')
  console.log(menuContainer)
  menuContainer.classList.toggle('active')
}
