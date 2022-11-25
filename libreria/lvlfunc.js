//
//funciones de nivel nwn
//
const fs = require('fs')
const _level = JSON.parse(fs.readFileSync('./basededatos/usuariosgod/nivel.json'));

const getLevelingXp = (sender) => {
	let position = !1
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== !1) {
		return _level[position].xp
	}
}
//
const getLevelingLevel = (sender) => {
	let position = !1
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== !1) {
		return _level[position].level
	}
}
//
const getLevelingId = (sender) => {
	let position = !1
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== !1) {
		return _level[position].id
	}
}
//
const addLevelingXp = (sender, amount) => {
	let position = !1
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== !1) {
		_level[position].xp += amount
		fs.writeFileSync('./basededatos/usuariosgod/nivel.json', JSON.stringify(_level))
	}
}
//
const addLevelingLevel = (sender, amount) => {
	let position = !1
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== !1) {
		_level[position].level += amount
		fs.writeFileSync('./basededatos/usuariosgod/nivel.json', JSON.stringify(_level))
	}
}
//
const addLevelingId = (sender) => {
	const obj = {
		id: sender,
		xp: 1,
		level: 1
	}
	_level.push(obj)
	fs.writeFileSync('./basededatos/usuariosgod/nivel.json', JSON.stringify(_level))
}

module.exports = { getLevelingXp, getLevelingLevel, getLevelingId, addLevelingXp, addLevelingLevel, addLevelingId }
