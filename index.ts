#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";

// Class for hero
class Player {
    name: string;
    health: number = 100;

    constructor(name: string) {
        this.name = name;
    }
    decreaseHealth() {
        this.health -= 25;
    }

    increaseHealth() {
        this.health = 100;
    }
}

// Class for villain
class Enemy {
    name: string;
    health: number = 100;

    constructor(name: string) {
        this.name = name;
    }
    decreaseHealth() {
        this.health -= 25;
    }

    increaseHealth() {
        this.health = 100;
    }
}

async function main() {
    const { heroName } = await inquirer.prompt([
        {
            type: "input",
            name: "heroName",
            message: "Enter Your Hero Name",
        },
    ]);

    const player = new Player(heroName);

    while (true) {
        const { enemyType } = await inquirer.prompt([
            {
                type: "list",
                name: "enemyType",
                choices: ["Assassin", "Skeleton", "Zombie"],
                message: "Select your enemy for battle:",
            },
        ]);

        const enemy = new Enemy(enemyType);

        while (enemy.health > 0 && player.health > 0) {
            const { action } = await inquirer.prompt([
                {
                    type: "list",
                    name: "action",
                    message: "Choose the action to perform:",
                    choices: ["Attack", "Drink Potion", "Run For Life"],
                },
            ]);

            if (action === "Attack") {
                let num = Math.floor(Math.random() * 2);

                if (num === 0) {
                    player.decreaseHealth();
                    console.log(chalk.red.bold(`${player.name}'s Health is ${player.health}`));
                } else {
                    enemy.decreaseHealth();
                    console.log(chalk.green.bold(`${enemy.name}'s Health is ${enemy.health}`));
                }

                if (player.health <= 0) {
                    console.log(chalk.red.bold.italic(`You lose, better luck next time`));
                    return;
                }

                if (enemy.health <= 0) {
                    console.log(chalk.green.bold.italic(`You defeated the ${enemy.name}!`));
                    break;
                }

            } else if (action === "Drink Potion") {
                player.increaseHealth();
                console.log(chalk.green.bold.italic(`You drank the health potion, your health is ${player.health}`));
            } else if (action === "Run For Life") {
                console.log(chalk.red.bold.italic(`You ran away, better luck next time`));
                return;
            }
        }
    }
}

main();
