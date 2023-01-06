import React, { useState } from 'react';
import './TicTacToe.css';

const TicTacToe = () => {
    const [turn, setTurn] = useState('x');
    const [cells, setCells] = useState(Array(9).fill(''));
    const [winner, setWinner] = useState();

    const checkWinner = (arr) => {
        let combos = {
            across: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
            down: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8]
            ],
            diagonal: [
                [0, 4, 8],
                [2, 4, 6]
            ],
        };

        for (let combo in combos) {
            combos[combo].forEach(pattern => {
                if (
                    arr[pattern[0]] === '' ||
                    arr[pattern[1]] === '' ||
                    arr[pattern[2]] === ''
                ) {
                    // do nothing
                } else if (
                    arr[pattern[0]] === arr[pattern[1]] &&
                    arr[pattern[1]] === arr[pattern[2]]
                ) {
                    setWinner(arr[pattern[0]])
                }
            });
        }
    };

    const handleClick = (num) => {
        if (cells[num] !== '') {
            return;
        }
        let arr = [...cells];
        if (turn === 'x') {
            arr[num] = 'x'
            setTurn('o');
        }
        else {
            arr[num] = 'o'
            setTurn('x')
        }
        checkWinner(arr);
        setCells(arr);
    }
    const Cell = ({ num }) => {
        return <td onClick={() => handleClick(num)}>{cells[num]}</td>
    }


    const handleRestart = () => {
        setWinner(null);
        setCells(Array(9).fill(''));
    }

    return (
        <div className='container'>
            turn: {turn}
            <table>
                <tbody>
                    <tr>
                        <Cell num={0} />
                        <Cell num={1} />
                        <Cell num={2} />
                    </tr>
                    <tr>
                        <Cell num={3} />
                        <Cell num={4} />
                        <Cell num={5} />
                    </tr>
                    <tr>
                        <Cell num={6} />
                        <Cell num={7} />
                        <Cell num={8} />
                    </tr>
                </tbody>
            </table>
            {
                winner ? (
                    <>
                        <p>{winner} is the winner</p>
                        <button onClick={() => handleRestart()}>Reset</button>
                    </>
                ) :
                    <>
                        <p>no winner</p>
                        <button onClick={() => handleRestart()}>Reset</button>
                    </>
            }
        </div>
    )
}

export default TicTacToe;