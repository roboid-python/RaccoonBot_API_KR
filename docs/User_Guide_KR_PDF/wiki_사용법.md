# 사용법 (Usage Guide)

Source: https://github.com/RobomationLAB/RaccoonBot_Guide_KR/wiki/%EC%82%AC%EC%9A%A9%EB%B2%95

## Installation & Setup

The RaccoonBot arrives fully assembled and is ready to use immediately upon power-up. It enters standby mode and supports both unplugged (Teaching & Playback) and plugged (coding via Mini Dongle+) modes.

## Operating Modes

- **Standby**: Initial preparation state
- **Unplugged Mode**: Teaching & Playback without coding; supports gripper control and peripheral device integration
- **Coding Mode**: Direct control via RobomationLAB, Scratch, or Python environments

## Interface Components

Includes 4 buttons (Power, Play, Delete, Teach), multiple LED indicators (status, mode, joint, charging), and connection ports for end-effectors and peripherals.

## Button Functions

Each button supports three input types—click, double-click, and long press—with different functions depending on the mode. For example, the Teach button saves joint angles or adds wait times during learning sequences.

## LED Status Indicators

LEDs communicate device state through color and blinking patterns. The status LED shows operation state (green for playback, blue for Bluetooth), while the mode LED indicates current operating mode.

## End-Effector & Charging

The gripper connects via a clamping mechanism and requires cable attachment. The robot charges via USB-C (5V/3A recommended) for approximately 3 hours. Charging LEDs indicate battery status and charging progress.

## Home Position

Upon startup, the robot automatically moves to a calibrated home position with specific joint angles.
