# 언플러그드 코딩 (Unplugged Coding)

Source: https://github.com/RobomationLAB/RaccoonBot_Guide_KR/wiki/%EC%96%B8%ED%94%8C%EB%9F%AC%EA%B7%B8%EB%93%9C-%EC%BD%94%EB%94%A9

## Overview

Documents **Unplugged Mode** for RaccoonBot, enabling teaching and playback of movements without complex programming.

## Key Features

- Record robot movements through Teaching & Playback functionality
- Store up to 250 different motion sequences
- Enable factory automation scenarios with peripheral device integration
- Use Auto Leveling features for intuitive operation

## Teaching & Playback

- **Teaching**: Press TEACH button to save joint angles. Supports single-click, double-click (with gripper toggle), and long-press (with wait time settings)
- **Playback**: Press PLAY button to execute saved sequences. Double-click enables infinite loop; long-press saves to internal memory
- Maximum storage: 250 movements per session

## Safety Features

- **Smart Stop**: Automatically halts motion if obstacles are detected (Unplugged mode only)
- **Visual/Audio Feedback**: LED indicators (purple flash on teaching, rainbow on deletion) and buzzer alerts

## Memory Management

- Internal memory stores only the last saved sequence
- New saves overwrite previous data
- DELETE button removes recent or all movements

## Auto Leveling Function

Maintains joint 4 position automatically:
- **Vertical mode**: Press PLAY while powering on
- **Horizontal mode**: Press DELETE while powering on
- Activated by entering Unplugged mode after setup (shown by yellow LED)

## LED Status Indicators

- White: Standby
- Green: Unplugged mode active
- Yellow: Auto Leveling mode ready
- Purple: Teaching in progress
- Red: Safety stop activated
