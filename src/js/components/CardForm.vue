<template>
  <div
    class="card-form"
  >
    <div class="card-list">
      <div
        class="card-item"
        :class="{ '-active' : isCardFlipped }"
      >
        <div class="card-item__side -front">
          <div
            ref="focusElement"
            class="card-item__focus"
            :class="{'-active' : focusElementStyle }"
            :style="focusElementStyle"
          />
          <div class="card-item__cover">
            <img
              :src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/images/' + currentCardBackground + '.jpeg'"
              class="card-item__bg"
              :alt="currentCardBackground"
            >
          </div>
          <div class="card-item__wrapper">
            <div class="card-item__top">
              <img
                src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/images/chip.png"
                class="card-item__chip"
                alt="chip"
              >
              <div class="card-item__type">
                <transition name="slide-fade-up">
                  <img
                    v-if="getCardType"
                    :key="getCardType"
                    :src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/images/' + getCardType + '.png'"
                    :alt="getCardType"
                    class="card-item__typeImg"
                  >
                </transition>
              </div>
            </div>
            <label
              ref="cardNumber"
              for="cardNumber"
              class="card-item__number"
            >
              <template v-if="getCardType === 'amex'">
                <span
                  v-for="(n, $index) in amexCardMask"
                  :key="$index"
                >
                  <transition name="slide-fade-up">
                    <div
                      v-if="cardData.cardNumber.length > $index"
                      key="1"
                      class="card-item__numberItem"
                      :class="{ '-active' : n.trim() === '' }"
                    >
                      {{ cardData.cardNumber[$index] }}
                    </div>
                    <div
                      v-else
                      key="2"
                      class="card-item__numberItem"
                      :class="{ '-active' : n.trim() === '' }"
                    >
                      {{ n }}
                    </div>
                  </transition>
                </span>
              </template>

              <template v-else>
                <span
                  v-for="(n, $index) in otherCardMask"
                  :key="$index"
                >
                  <transition name="slide-fade-up">
                    <div
                      v-if="cardData.cardNumber.length > $index"
                      key="1"
                      class="card-item__numberItem"
                      :class="{ '-active' : n.trim() === '' }"
                    >
                      {{ cardData.cardNumber[$index] }}
                    </div>
                    <div
                      v-else
                      key="2"
                      class="card-item__numberItem"
                      :class="{ '-active' : n.trim() === '' }"
                    >
                      {{ n }}
                    </div>
                  </transition>
                </span>
              </template>
            </label>
            <div class="card-item__content">
              <label
                ref="cardName"
                for="cardName"
                class="card-item__info"
              >
                <div class="card-item__holder">Card Holder</div>
                <transition name="slide-fade-up">
                  <div
                    v-if="cardData.cardName.length"
                    key="1"
                    class="card-item__name"
                  >
                    <transition-group name="slide-fade-right">
                      <span
                        v-for="(n, $index) in cardData.cardName.replace(/\s\s+/g, ' ')"
                        v-if="$index === $index"
                        :key="$index + 1"
                        class="card-item__nameItem"
                      >{{ n }}</span>
                    </transition-group>
                  </div>
                  <div
                    v-else
                    key="2"
                    class="card-item__name"
                  >Ad Soyad</div>
                </transition>
              </label>
              <div
                ref="cardDate"
                class="card-item__date"
              >
                <label
                  for="cardMonth"
                  class="card-item__dateTitle"
                >Expires</label>
                <label
                  for="cardMonth"
                  class="card-item__dateItem"
                >
                  <transition name="slide-fade-up">
                    <span
                      v-if="cardData.cardMonth"
                      :key="cardData.cardMonth"
                    >{{ cardData.cardMonth }}</span>
                    <span
                      v-else
                      key="2"
                    >MM</span>
                  </transition>
                </label>
                /
                <label
                  for="cardYear"
                  class="card-item__dateItem"
                >
                  <transition name="slide-fade-up">
                    <span
                      v-if="cardData.cardYear"
                      :key="cardData.cardYear"
                    >{{ String(cardData.cardYear).slice(2,4) }}</span>
                    <span
                      v-else
                      key="2"
                    >YY</span>
                  </transition>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="card-item__side -back">
          <div class="card-item__cover">
            <img
              :src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/images/' + currentCardBackground + '.jpeg'"
              class="card-item__bg"
            >
          </div>
          <div class="card-item__band" />
          <div class="card-item__cvv">
            <div class="card-item__cvvTitle">
              CVV
            </div>
            <div class="card-item__cvvBand">
              <template v-for="n in cardData.cardCvv.split('').length">
                *
              </template>
            </div>
            <div class="card-item__type">
              <img
                v-if="getCardType"
                :src="'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/images/' + getCardType + '.png'"
                class="card-item__typeImg"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <form
      class="card-form__inner"
      @submit.prevent="submitForm"
    >
      <div class="card-input">
        <label
          for="cardNumber"
          class="card-input__label -required"
        >Card Number</label>
        <input
          id="cardNumber"
          v-model="cardData.cardNumber"
          v-mask="generateCardNumberMask"
          type="text"
          class="card-input__input"
          data-ref="cardNumber"
          autocomplete="off"
          inputmode="decimal"
          required
          @focus="focusInput"
          @blur="blurInput"
        >
      </div>
      <div class="card-input">
        <label
          for="cardName"
          class="card-input__label"
        >Card Name</label>
        <input
          id="cardName"
          v-model="cardData.cardName"
          type="text"
          class="card-input__input"
          data-ref="cardName"
          autocomplete="off"
          @focus="focusInput"
          @blur="blurInput"
        >
      </div>
      <div class="card-form__row">
        <div class="card-form__col">
          <div class="card-form__group">
            <label
              for="cardMonth"
              class="card-input__label -required"
            >Expiration Date</label>
            <select
              id="cardMonth"
              v-model="cardData.cardMonth"
              class="card-input__input -select"
              data-ref="cardDate"
              required
              @focus="focusInput"
              @blur="blurInput"
            >
              <option
                value=""
                disabled
                selected
              >
                Month
              </option>
              <option
                v-for="n in 12"
                :key="n"
                :value="n < 10 ? '0' + n : n"
                :disabled="n < minCardMonth"
              >
                {{ n < 10 ? '0' + n : n }}
              </option>
            </select>
            <select
              id="cardYear"
              v-model="cardData.cardYear"
              class="card-input__input -select"
              data-ref="cardDate"
              required
              @focus="focusInput"
              @blur="blurInput"
            >
              <option
                value=""
                disabled
                selected
              >
                Year
              </option>
              <option
                v-for="(n, $index) in 12"
                :key="n"
                :value="$index + minCardYear"
              >
                {{ $index + minCardYear }}
              </option>
            </select>
          </div>
        </div>
        <div class="card-form__col -cvv">
          <div class="card-input">
            <label
              for="cardCvv"
              class="card-input__label -required"
            >CVV</label>
            <input
              id="cardCvv"
              v-model="cardData.cardCvv"
              v-mask="'####'"
              type="password"
              class="card-input__input"
              autocomplete="off"
              inputmode="decimal"
              required
              @focus="flipCard(true)"
              @blur="flipCard(false)"
            >
          </div>
        </div>
      </div>
      <button
        class="card-form__button"
        type="submit"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'CardForm',
  data() {
    return {
      cardData: {
        cardName: '',
        cardNumber: '',
        cardMonth: '',
        cardYear: '',
        cardCvv: ''
      },
      minCardYear: new Date().getFullYear(),
      amexCardMask: '#### ###### #####',
      otherCardMask: '#### #### #### ####',
      isCardFlipped: false,
      focusElementStyle: null,
      isInputFocused: false,
      currentCardBackground: Math.floor(Math.random() * 25 + 1) // just for fun :D
    };
  },
  computed: {
    getCardType() {
      const number = this.cardData.cardNumber;
      let re = new RegExp('^4');
      if (number.match(re) != null) return 'visa';

      re = new RegExp('^(34|37)');
      if (number.match(re) != null) return 'amex';

      re = new RegExp('^5[1-5]');
      if (number.match(re) != null) return 'mastercard';

      re = new RegExp('^6011');
      if (number.match(re) != null) return 'discover';

      return 'visa'; // default type
    },
    generateCardNumberMask() {
      return this.getCardType === 'amex' ? this.amexCardMask : this.otherCardMask;
    },
    minCardMonth() {
      if (this.cardData.cardYear === this.minCardYear) return new Date().getMonth() + 1;
      return 1;
    }
  },
  watch: {
    cardYear() {
      if (this.cardData.cardMonth < this.minCardMonth) {
        this.cardData.cardMonth = '';
      }
    }
  },
  mounted() {
    document.getElementById('cardNumber').focus();
  },
  methods: {
    flipCard(status) {
      this.isCardFlipped = status;
    },
    focusInput(e) {
      this.isInputFocused = true;
      const targetRef = e.target.dataset.ref;
      const target = this.$refs[targetRef];
      this.focusElementStyle = {
        width: `${target.offsetWidth}px`,
        height: `${target.offsetHeight}px`,
        transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
      };
    },
    blurInput() {
      const vm = this;
      setTimeout(() => {
        if (!vm.isInputFocused) {
          vm.focusElementStyle = null;
        }
      }, 100);
      vm.isInputFocused = false;
    },
    submitForm() {
      axios.post('http://httpbin.org/post', this.cardData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="sass">
.card-form
  max-width: 570px
  margin: auto
  width: 100%
  @media screen and (max-width: 576px)
    margin: 0 auto
  &__inner
    background: #fff
    box-shadow: 0 30px 60px 0 rgba(90, 116, 148, 0.4)
    border-radius: 10px
    padding: 35px
    padding-top: 180px
    @media screen and (max-width: 480px)
      padding: 25px
      padding-top: 165px
    @media screen and (max-width: 360px)
      padding: 15px
      padding-top: 165px
  &__row
    display: flex
    align-items: flex-start
    @media screen and (max-width: 480px)
      flex-wrap: wrap
  &__col
    flex: auto
    margin-right: 35px
    &:last-child
      margin-right: 0

    @media screen and (max-width: 480px)
      margin-right: 0
      flex: unset
      width: 100%
      margin-bottom: 20px
      &:last-child
        margin-bottom: 0
    &.-cvv
      max-width: 150px
      @media screen and (max-width: 480px)
        max-width: initial
  &__group
    display: flex
    align-items: flex-start
    flex-wrap: wrap
    .card-input__input
      flex: 1
      margin-right: 15px
      &:last-child
        margin-right: 0
  &__button
    width: 100%
    height: 55px
    background: #2364d2
    border: none
    border-radius: 5px
    font-size: 22px
    font-weight: 500
    font-family: "Source Sans Pro", sans-serif
    box-shadow: 3px 10px 20px 0px rgba(35, 100, 210, 0.3)
    color: #fff
    margin-top: 20px
    cursor: pointer
    @media screen and (max-width: 480px)
      margin-top: 10px
.card-item
  max-width: 430px
  height: 270px
  margin-left: auto
  margin-right: auto
  position: relative
  z-index: 2
  width: 100%
  @media screen and (max-width: 480px)
    max-width: 310px
    height: 220px
    width: 90%
  @media screen and (max-width: 360px)
    height: 180px
  &.-active
    .card-item__side
      &.-front
        transform: perspective(1000px) rotateY(180deg) rotateX(0deg) rotateZ(0deg)
      &.-back
        transform: perspective(1000px) rotateY(0) rotateX(0deg) rotateZ(0deg)
  &__focus
    position: absolute
    z-index: 3
    border-radius: 5px
    left: 0
    top: 0
    width: 100%
    height: 100%
    transition: all 0.35s cubic-bezier(0.71, 0.03, 0.56, 0.85)
    opacity: 0
    pointer-events: none
    overflow: hidden
    border: 2px solid rgba(255, 255, 255, 0.65)
    &:after
      content: ""
      position: absolute
      top: 0
      left: 0
      width: 100%
      background: rgb(8, 20, 47)
      height: 100%
      border-radius: 5px
      filter: blur(25px)
      opacity: 0.5
    &.-active
      opacity: 1
  &__side
    border-radius: 15px
    overflow: hidden
    box-shadow: 0 20px 60px 0 rgba(14, 42, 90, 0.55)
    transform: perspective(2000px) rotateY(0deg) rotateX(0deg) rotate(0deg)
    transform-style: preserve-3d
    transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85)
    backface-visibility: hidden
    height: 100%
    &.-back
      position: absolute
      top: 0
      left: 0
      width: 100%
      transform: perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg)
      z-index: 2
      padding: 0
      height: 100%
      .card-item__cover
        transform: rotateY(-180deg)
  &__bg
    max-width: 100%
    display: block
    max-height: 100%
    height: 100%
    width: 100%
    object-fit: cover
  &__cover
    height: 100%
    background-color: #1c1d27
    position: absolute
    height: 100%
    background-color: #1c1d27
    left: 0
    top: 0
    width: 100%
    border-radius: 15px
    overflow: hidden
    &:after
      content: ""
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      background: rgba(6, 2, 29, 0.45)
  &__top
    display: flex
    align-items: flex-start
    justify-content: space-between
    margin-bottom: 40px
    padding: 0 10px
    @media screen and (max-width: 480px)
      margin-bottom: 25px
    @media screen and (max-width: 360px)
      margin-bottom: 15px
  &__chip
    width: 60px
    @media screen and (max-width: 480px)
      width: 50px
    @media screen and (max-width: 360px)
      width: 40px
  &__type
    height: 45px
    position: relative
    display: flex
    justify-content: flex-end
    max-width: 100px
    margin-left: auto
    width: 100%
    @media screen and (max-width: 480px)
      height: 40px
      max-width: 90px
    @media screen and (max-width: 360px)
      height: 30px
  &__typeImg
    max-width: 100%
    object-fit: contain
    max-height: 100%
    object-position: top right
  &__info
    color: #fff
    width: 100%
    max-width: calc(100% - 85px)
    padding: 10px 15px
    font-weight: 500
    display: block
    cursor: pointer
    @media screen and (max-width: 480px)
      padding: 10px
  &__holder
    opacity: 0.7
    font-size: 13px
    margin-bottom: 6px
    @media screen and (max-width: 480px)
      font-size: 12px
      margin-bottom: 5px
  &__wrapper
    font-family: "Source Code Pro", monospace
    padding: 25px 15px
    position: relative
    z-index: 4
    height: 100%
    text-shadow: 7px 6px 10px rgba(14, 42, 90, 0.8)
    user-select: none
    @media screen and (max-width: 480px)
      padding: 20px 10px
  &__name
    font-size: 18px
    line-height: 1
    white-space: nowrap
    max-width: 100%
    overflow: hidden
    text-overflow: ellipsis
    text-transform: uppercase
    @media screen and (max-width: 480px)
      font-size: 16px
  &__nameItem
    display: inline-block
    min-width: 8px
    position: relative
  &__number
    font-weight: 500
    line-height: 1
    color: #fff
    font-size: 27px
    margin-bottom: 35px
    display: inline-block
    padding: 10px 15px
    cursor: pointer
    @media screen and (max-width: 480px)
      font-size: 21px
      margin-bottom: 15px
      padding: 10px 10px
    @media screen and (max-width: 360px)
      font-size: 19px
      margin-bottom: 10px
      padding: 10px 10px
  &__numberItem
    width: 16px
    display: inline-block
    &.-active
      width: 30px
    @media screen and (max-width: 480px)
      width: 13px
      &.-active
        width: 16px
    @media screen and (max-width: 360px)
      width: 12px
      &.-active
        width: 8px
  &__content
    color: #fff
    display: flex
    align-items: flex-start
  &__date
    flex-wrap: wrap
    font-size: 18px
    margin-left: auto
    padding: 10px
    display: inline-flex
    width: 80px
    white-space: nowrap
    flex-shrink: 0
    cursor: pointer
    @media screen and (max-width: 480px)
      font-size: 16px
  &__dateItem
    position: relative
    span
      width: 22px
      display: inline-block
  &__dateTitle
    opacity: 0.7
    font-size: 13px
    padding-bottom: 6px
    width: 100%
    @media screen and (max-width: 480px)
      font-size: 12px
      padding-bottom: 5px
  &__band
    background: rgba(0, 0, 19, 0.8)
    width: 100%
    height: 50px
    margin-top: 30px
    position: relative
    z-index: 2
    @media screen and (max-width: 480px)
      margin-top: 20px
    @media screen and (max-width: 360px)
      height: 40px
      margin-top: 10px
  &__cvv
    text-align: right
    position: relative
    z-index: 2
    padding: 15px
    .card-item__type
      opacity: 0.7

    @media screen and (max-width: 360px)
      padding: 10px 15px
  &__cvvTitle
    padding-right: 10px
    font-size: 15px
    font-weight: 500
    color: #fff
    margin-bottom: 5px
  &__cvvBand
    height: 45px
    background: #fff
    margin-bottom: 30px
    text-align: right
    display: flex
    align-items: center
    justify-content: flex-end
    padding-right: 10px
    color: #1a3b5d
    font-size: 18px
    border-radius: 4px
    box-shadow: 0px 10px 20px -7px rgba(32, 56, 117, 0.35)
    @media screen and (max-width: 480px)
      height: 40px
      margin-bottom: 20px
    @media screen and (max-width: 360px)
      margin-bottom: 15px
.card-list
  margin-bottom: -130px
  @media screen and (max-width: 480px)
    margin-bottom: -120px
.card-input
  margin-bottom: 20px
  &__label
    font-size: 14px
    margin-bottom: 5px
    font-weight: 500
    color: #1a3b5d
    width: 100%
    display: block
    user-select: none
    &.-required
      &::after
        content: ' *'
        color: red
  &__input
    width: 100%
    height: 50px
    border-radius: 5px
    box-shadow: none
    border: 1px solid #ced6e0
    transition: all 0.3s ease-in-out
    font-size: 18px
    padding: 5px 15px
    background: none
    color: #1a3b5d
    font-family: "Source Sans Pro", sans-serif
    &:hover
    &:focus
      border-color: #3d9cff
    &:focus
      box-shadow: 0px 10px 20px -13px rgba(32, 56, 117, 0.35)

    &.-select
      -webkit-appearance: none
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAeCAYAAABuUU38AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUxJREFUeNrM1sEJwkAQBdCsngXPHsQO9O5FS7AAMVYgdqAd2IGCDWgFnryLFQiCZ8EGnJUNimiyM/tnk4HNEAg/8y6ZmMRVqz9eUJvRaSbvutCZ347bXVJy/ZnvTmdJ862Me+hAbZCTs6GHpyUi1tTSvPnqTpoWZPUa7W7ncT3vK4h4zVejy8QzM3WhVUO8ykI6jOxoGA4ig3BLHcNFSCGqGAkig2yqgpEiMsjSfY9LxYQg7L6r0X6wS29YJiYQYecemY+wHrXD1+bklGhpAhBDeu/JfIVGxaAQ9sb8CI+CQSJ+QmJg0Ii/EE2MBiIXooHRQhRCkBhNhBcEhLkwf05ZCG8ICCOpk0MULmvDSY2M8UawIRExLIQIEgHDRoghihgRIgiigBEjgiFATBACAgFgghEwSAAGgoBCBBgYAg5hYKAIFYgHBo6w9RRgAFfy160QuV8NAAAAAElFTkSuQmCC')
      background-size: 12px
      background-position: 90% center
      background-repeat: no-repeat
      padding-right: 30px
</style>
