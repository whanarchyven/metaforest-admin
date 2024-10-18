# Next.js Project

## Первый запуск

Для успешного запуска необходимо:

- Скопировать `.env.example` в `.env.local` и заполнить переменными по образцу. Значение переменных см. ниже в пункте [Переменные среды](#переменные-среды)
- Установить все зависимости (нужно иметь локально установленный Node.js, используемую версию на этом проекте можно посмотреть в package.json):

```bash
npm i
```

- Далее нужно настроить husky, чтобы коммиты не создавались, если есть ошибки eslint + форматирование кода при каждом коммите
- Для этого нужно поочередно выполнить эти 4 команды

```bash
npx husky-init
git add .husky/pre-commit
chmod ug+x .husky/*
chmod ug+x .git/hooks/*
```

## Запуск для разработки

Для успешного запуска необходимо:

- Скопировать `.env.example` в `.env.local` и заполнить переменными по образцу. Значение переменных см. ниже в пункте [Переменные среды](#переменные-среды)
- Запустить локальный dev сервер

```bash
npm run dev
```

## Билд

- Перед тем как запушить изменения, убедитесь сначала, что проект сбилдился локально и нет ошибок

```bash
npm run build
```

## Архитектура проекта

[https://feature-sliced.design/docs/get-started](https://feature-sliced.design/docs/get-started)

## Переменные среды

Значения переменных можно узнать у разработчиков, которые уже работают на проекте или если вы начинаете с нуля, то все значения вносите самостоятельно и далее по необходимости делитесь с другими разработчиками лично. Заполненный .env в гит пушить не рекомендуется, в особенности если там есть важные данные, вроде токенов.
При начальной разработке проекта, когда api для интеграции еще не готово, обязательные поля как правило будут пустые и заполняются позже

| Переменная                      | Значение                                                                                                                             | Обязательно |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| NEXT_PUBLIC_FRONT_BASE_URL      | URL, на котором находится контент (файлы, изображения). Здесь должен быть URL бекенда.                                               | да          |
| NEXT_PUBLIC_FRONT_API_URL       | URL REST API бекенда, формируется по принципу `https://<домен-бекенда>/api`                                                          | да          |
| NEXT_PUBLIC_FRONT_PROXY_API_URL | URL для прокси, например /api/proxy                                                                                                  | да          |
| NEXT_PUBLIC_BASIC_AUTH_LOGIN    | Логин базовой аутентификации для запросов на бекенд. Если бекенд не защищен базовой аутентификацией, можно оставлять пустым.         | нет         |
| NEXT_PUBLIC_BASIC_AUTH_PASSWORD | Пароль базовой аутентификации для запросов на бекенд. Если бекенд не защищен базовой аутентификацией, можно оставлять пустым.        | нет         |
| UNOPTIMIZED_IMAGES              | Нужно ли пропускать оптимизацию изображений. 0 - нет, 1 - да. Оптимизацией изображений занимается бекенд. Значение по умолчанию - 0. | нет         |
| ENABLE_SENTRY                   | Нужно ли включить sentry на проекте, 0 - нет, 1 - да. Данный параметр требует настройки других переменных связанных с sentry         | да          |
| SENTRY_DSN                      | Sentry DSN можно узнать в настройках проекта Sentry                                                                                  | нет         |
| SENTRY_PROJECT                  | Название проекта можно узнать в настройках проекта Sentry                                                                            | нет         |
| SENTRY_AUTH_TOKEN               | Auth token можно создать в настройках организации в Sentry                                                                           | нет         |

# Регламент по стилизации

## Вступление

Для стилизации компонентов в проектах на React/Next.js мы используем Tailwindcss в связке с CVA.  
**CVA (Class Variance Authority)** — библиотека, которая позволяет удобно управлять классами за пределами элементов, создавать различные состояния и комбинации из состояний.

- Документация по CVA [тут](https://cva.style/docs)
- Документация по Tailwindcss [тут](https://tailwindcss.com/docs/)

## Единицы измерения

Всегда используем rem, исключения только для медиа запросов. Для удобства в html по дефолту задан `font-size: 10px`, таким образом 1rem = 10px.

## Название классов

Названия классов должны быть в camelCase с добавлением префикса cva после семантического наименования элемента. 
**Пример:**

```typescript
export const cvaSubtitle = cva([
  'hero-cvaSubtitle',
  // тут будут стили
])
```
## Элементы БЭМ

Самый первый класс cva должен придерживаться naming-conventions из БЭМ, это упростит навигацию по элементам в проекте, позволяет поддерживать код в чистоте. **Пример компонента, стилизованного cva:**

```tsx
const PersonCard=()=>{
    
    const cvaRoot = cva([
        'persconCard-cvaRoot'
        //остальные стили
    ])

    const cvaImage = cva([
        'persconCard-cvaImage'
        //остальные стили
    ])

    const cvaTitle = cva([
        'persconCard-cvaTitle'
        //остальные стили
    ])

    const cvaDescription = cva([
        'persconCard-cvaDescription'
        //остальные стили
    ])

    return (
        <div className={cvaRoot()}>
            <img className={cvaImage()}/>
            <h3 className={cvaTitle()}></h3>
            <p className={cvaDescription()}></p>
        </div>
    )
    
}
export default PersonCard
```

## Добавление нескольких классов

Иногда необходимо добавить несколько классов, для этого используем пакет `clsx`.

**Пример:**

```jsx
<span className={clsx(cvaSubtitle(), classNameFromParentComponent)}> Какой-то подзаголовок </span>
```

## Группировка Tailwind классов

**Плохо:**

```typescript
const cvaMenuLink = cva(['inline-block uppercase text-xs whitespace-nowrap transition-colors duration-300 bg-red hover:bg-green'])
```

**Хорошо:**

```typescript
const cvaMenuLink = cva([
  'header-cvaMenuLink',
  'inline-block',
  'text-xs uppercase whitespace-nowrap',
  'bg-red hover:bg-green',
  'transition-colors duration-300',
])
```

## Порядок группировки классов

1. Название компонента и класса (названиеКомпонента-названиеКласса)
2. Тип отображения (grid, flex, inline-block и т.д.)
3. Позиционирование (position, z-index и т.д.)
4. Размеры (width, height и т.д.)
5. Отступы
6. Текстовые стили
7. Визуальное оформление (фон, бордеры, тени)
8. Прочие классы (cursor, selection-none)
9. Стилизация before/after и дочерних элементов

## Адаптация

Адаптивные свойства пишутся рядом с тем свойством, которое адаптируется.

**Пример:**

```typescript
const cvaMenuLink = cva([
  'header-cvaMenuLink',
  'inline-block',
  'text-xs sm:text-sm md:text-md lg:text-lg uppercase whitespace-nowrap',
  'bg-red hover:bg-green',
  'transition-colors duration-300'
])
```

Важно помнить, что Tailwind — это mobile-first библиотека, что означает, что мобильные свойства должны быть приоритетными. В случае, если вы верстаете сначала ПК версию, адаптируйте мобильные свойства справа налево.

## Пример адаптации:

- Верстаем только ПК версию:
```
text-lg uppercase whitespace-nowrap
```

- Добавляем адаптив под большие планшеты:
```
text-md lg:text-lg uppercase whitespace-nowrap
```

- Добавляем адаптив под маленькие планшеты:
```
text-sm md:text-md lg:text-lg uppercase whitespace-nowrap
```

- Добавляем адаптив под телефоны:
```
text-xs sm:text-sm md:text-md lg:text-lg uppercase whitespace-nowrap
```

## Tailwind конфиг

Конфиг редактируется и дополняется от проекта к проекту.  
При настройке важно:

- Добавить цвета, если их нет в макете. Например, cGray100, cGray200.
- Настроить `screens` для адаптации.
- Настроить `fontSize` и `fontFamily` для шрифтов.
- Настроить `spacing` для отступов (ширина, высота, padding, margin).
- Важно избегать добавления лишних свойств, если они редко используются.

## Tailwind плагины

В разделе plugins можно добавлять плагины, создавая свои классы, например:

```css
.absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

## Tailwind фичи

Свойства, для которых нет сокращений в Tailwind, указываются в квадратных скобках. Например:

```
[backface-visibility:hidden]
```

Кастомные значения в свойствах указываются в квадратных скобках, внутри не должно быть пробелов:

```
w-[12.3rem] w-[calc(100%-5rem)]
```

Обратиться к дочернему элементу можно также в квадратных скобках, используя стандартные селекторы:

```
[&>svg]:w-full [&>span:nth-child(2)]:text-red
```


# Стейт менеджер Zustand

Разберём базовый регламент работы  с zustand.Все сторы размещаются в /shared/store

```tsx
import {create} from 'zustand';

interface ExampleStoreState { //Определение типов для параметров стейта
    someValue: number;
}

interface ExampleStoreActions { //Определение типов для мутаций
    setSomeValue: (someValue: number) => void;
    increment: () => void;
}

export const useExampleStore = create<ExampleStoreValue & ExampleStoreActions>(
    (set) => ({
        someValue: 0, //дефолтное значение
        setSomeValue: (someValue) => { //Переопределенние
            set((state) => {
                return {
                    someValue,
                };
            });
        }, increment: () => { //использование значений стейта внутри мутации
            set((state) => {
                someValue:state.someValue + 1
            });
        }
    })
);

```

Использование стейта в компонентах:

``` tsx
function Counter() {
  const { someValue, increment } = useStore()
  return (
    <div>
      <span>{someValue}</span>
      <button onClick={increment}>+</button>
    </div>
  )
}
```