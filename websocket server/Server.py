import asyncio
import websockets

connected = set()
player_data = []


async def consumer_handler(websocket, path):
    global connected
    # Register Client
    connected.add(websocket)
    print("Client connected")
    try:
        async for msg in websocket:
            await handle_msg(msg, websocket)
    # except Exception:
    #    pass
    finally:
        # Unregister Client
        print("Client disconnected")
        connected.remove(websocket)
        for pd in player_data:
            if(pd[0] not in connected):
                player_data.remove(pd)


async def handle_msg(message, websocket):
    found = False
    for pd in player_data:
        if(pd[0] == websocket):
            pd[1] = message
            found = True
            break
    if(not found):
        player_data.append([websocket, message])
    data = '['
    for pd in player_data:
        if(pd[0] in connected and pd[0] != websocket):
            data += pd[1] + ","
    data += "[]]"

    await websocket.send(data)

asyncio.get_event_loop().run_until_complete(websockets.serve(consumer_handler, '', 80))

asyncio.get_event_loop().run_forever()
