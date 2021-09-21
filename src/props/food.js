function randomFood(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}
export default function genFood() {
    food_x = randomFood(0, snakeboard.width - 10);
    food_y = randomFood(0, snakeboard.height - 10);
    snake.forEach(function has_snake_eaten_food(part) {
        const has_eaten = part.x == food.x && part.y == food.y;
        if (has_eaten) {genFood();counter++};
    });
}