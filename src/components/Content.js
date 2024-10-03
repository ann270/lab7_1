import React, { Component } from 'react';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickCount1: 0,
      clickCount2: 0,
      currentImage: null,
      maxImageWidth: 1000,
    };
  }

  // Номер варіанту
  n = 6;
  // Обчислюємо індекс елемента
  elementIndex = (this.n % 10) + 1;

  // Функція для зміни класів
  changeClass = (element, clickCount) => {
    if (clickCount === 1) {
      element.classList.add("first-click");
      element.classList.remove("second-click");
    } else if (clickCount === 2) {
      element.classList.add("second-click");
      element.classList.remove("first-click");
    }
  };

  // Обробник кліків для першого елемента
  handleFirstClick = () => {
    const allElements = document.querySelectorAll('body *');
    const element = allElements[this.elementIndex - 1];
    this.setState(
      prevState => {
        const newClickCount = prevState.clickCount1 + 1 > 2 ? 1 : prevState.clickCount1 + 1;
        this.changeClass(element, newClickCount);
        return { clickCount1: newClickCount };
      }
    );
  };

  // Обробник кліків для другого елемента
  handleSecondClick = () => {
    const allElements = document.querySelectorAll('body *');
    const element = allElements[this.elementIndex];
    this.setState(
      prevState => {
        const newClickCount = prevState.clickCount2 + 1 > 2 ? 1 : prevState.clickCount2 + 1;
        this.changeClass(element, newClickCount);
        return { clickCount2: newClickCount };
      }
    );
  };

  // Функція для оновлення поточного зображення
  updateCurrentImage = () => {
    const images = document.getElementById('image-container').getElementsByTagName('img');
    if (images.length > 0) {
      this.setState({ currentImage: images[images.length - 1] });
    } else {
      this.setState({ currentImage: null });
    }
  };

  // Додати зображення
  addImage = () => {
    const imageContainer = document.getElementById('image-container');
    const newImage = document.createElement('img');
    newImage.src =
      'https://karpatium.com.ua/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ2tJIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--24ed107f54771f607fc181c1583104574f0d1ee8/%D1%8F%D1%80%D0%B5%D0%BC%D1%87%D0%B5.jpeg';
    newImage.alt = 'Яремче';
    newImage.style.width = '600px';
    newImage.style.maxWidth = '100%';
    imageContainer.appendChild(newImage);
    this.updateCurrentImage();
  };

  // Збільшити зображення
  increaseImage = () => {
    if (this.state.currentImage) {
      let currentWidth = this.state.currentImage.clientWidth;
      let newWidth = currentWidth + 50;
      if (newWidth > this.state.maxImageWidth) {
        newWidth = this.state.maxImageWidth;
      }
      this.state.currentImage.style.width = `${newWidth}px`;
    }
  };

  // Зменшити зображення
  decreaseImage = () => {
    if (this.state.currentImage) {
      let currentWidth = this.state.currentImage.clientWidth;
      if (currentWidth > 100) {
        this.state.currentImage.style.width = `${currentWidth - 50}px`;
      }
    }
  };

  // Видалити зображення
  removeImage = () => {
    if (this.state.currentImage) {
      this.state.currentImage.remove();
      this.updateCurrentImage();
    }
  };

  componentDidMount() {
    this.updateCurrentImage();
    const allElements = document.querySelectorAll('body *');
    if (allElements[this.elementIndex - 1]) {
      allElements[this.elementIndex - 1].addEventListener('click', this.handleFirstClick);
    }
    if (allElements[this.elementIndex]) {
      allElements[this.elementIndex].addEventListener('click', this.handleSecondClick);
    }
  }

  componentWillUnmount() {
    const allElements = document.querySelectorAll('body *');
    if (allElements[this.elementIndex - 1]) {
      allElements[this.elementIndex - 1].removeEventListener('click', this.handleFirstClick);
    }
    if (allElements[this.elementIndex]) {
      allElements[this.elementIndex].removeEventListener('click', this.handleSecondClick);
    }
  }

  render() {
    return (
      <div>
        <p>Дата та місце народження: 27 січня, 2005 року, м. Вараш</p>
        <p>Освіта: Ліцей №4, м. Вараш; НТУУ "КПІ", м. Київ</p>

        <p>Хобі:</p>
        <ul>
          <li>Програмування</li>
          <li>Комп'ютерні ігри</li>
          <li>Спорт</li>
          <li>Читання</li>
        </ul>

        <p>Улюблені книги:</p>
        <ol>
          <li>"Іди туди, де страшно", Джим Ловлесс</li>
          <li>"Атомні звички", Джеймс Клір</li>
          <li>"Емоційний інтелект", Деніел Гоулман</li>
        </ol>

        <p>
        Яремче - чудове місто, яке знаходиться в горах, в мальовничій долині річки
        Прут (Івано-Франківська область). Через населений пункт прокладена дорога,
        яка веде до вершини Українських Карпат - Говерли.
      </p>
      <p>
        Вперше згадка про Яремче з'явилася в 1787-му році. Якщо вірити легенді,
        місто було назване на честь Яреми Голодованца - першого поселенця. В даний
        час Яремче являє собою відомий туристичний центр. Місто цікаве
        гуцульськими традиціями, обрядами - «андріївськими вечорницями»,
        «Розколяда», щорічним купальським святом «Гуцульська берегиня». Тут
        розташовано понад сорока рекреаційних комплексів, санаторіїв. Яремче
        залучає прихильників «зеленого» туризму і людей, охочих оздоровитися
        цілющими, мінеральними водами. На його території розкинувся національний,
        природний парк «Карпатський», заснований в 1980-му році, і водоспад
        «Пробій». Це найкраще місце, де можна відсвяткувати Новий рік, покататися
        на лижах, санях, сноуборді.
    </p>

        <div id="buttons">
          <button onClick={this.addImage}>Додати зображення</button>
          <button onClick={this.increaseImage}>Збільшити зображення</button>
          <button onClick={this.decreaseImage}>Зменшити зображення</button>
          <button onClick={this.removeImage}>Видалити зображення</button>
        </div>
      </div>
    );
  }
}

export default Content;
