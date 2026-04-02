import { BUILDINGS } from "../data/buildings.js"
import Building from "../entities/building.js"
import { tryFinalizeGame } from "./gameEnd.js"

export const buyBuilding = (buildingKey, gameState) => {
    if (gameState.phase === "ended") {
        return { status: "GAME_OVER" }
    }

    const buildingUserWantToBuy = BUILDINGS.find(item => item.key === buildingKey)

    if (!buildingUserWantToBuy) {
        return { status: "NOT_FOUND" }
    }

    if (gameState.city.balance < buildingUserWantToBuy.cost) {
        return {
            status: "FAILED"
        }
    }

    gameState.city.balance = gameState.city.balance - buildingUserWantToBuy.cost

    const building = new Building({
        name: buildingUserWantToBuy.name,
        key: buildingUserWantToBuy.key,
        role: buildingUserWantToBuy.role,
        type: buildingUserWantToBuy.type,
        description: buildingUserWantToBuy.description,
        capacity: buildingUserWantToBuy.capacity,
        cost: buildingUserWantToBuy.cost,
    })

    gameState.buildings = [...gameState.buildings, building]

    gameState.history = [...gameState.history, {
        action: "BUILDING_PURCHASED",
        turn: gameState.turn,
        city: gameState.city.name,
        lastBalance: gameState.city.balance + buildingUserWantToBuy.cost,
        newBalance: gameState.city.balance,
        buildingKey: building.key,
        buildingName: building.name,
        buildingRole: building.role,
        buildingCost: building.cost,
        buildingCapacity: building.capacity,
    }]

    tryFinalizeGame(gameState)
}