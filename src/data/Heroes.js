export const heroesData = [
    {
        "id": 1,
        "name": "Mercenary",
        "codeName": "es_mercenary",
        "heroName": "Markus Kruber",
        "health": 125,
        "passive": {
            "name": "Paced Strikes",
            "description": "Hitting 3 enemies in one swing grants 10% increased attack speed for 6 seconds.",
            "notes": "",
            "modifier": {
                "type": "attack_speed",
                "value": 0.10,
                "conditional": true
            }
        },
        "skill": {
            "name": "Morale Boost",
            "description": "Markus grants nearby allies 25 temporary health, and staggers nearby enemies.",
            "notes": "Staggers bosses",
            "cooldown": 90
        },
        "perks": [
            {
                "name": "Hitting the Sweet Spot",
                "description": "Attacks cleave through more enemies."
            },            
            {
                "name": "No More Laughin' Now!",
                "description": "Increased crit chance by 5%",
                "modifier": {
                    "type": "crit_chance",
                    "value": 0.05,
                    "conditional": false
                }
            }
        ],
        "talents": [
            {                
                "name": "Drillmaster",
                "description": "Damaging multiple enemies in one swing with a melee weapon grants temporary health. Max 5 enemies."
            },
            {                
                "name": "Mercenary’s Pride",
                "description": "Melee killing blows restore temporary health based on the health of the slain enemy."
            },
            {                
                "name": "Captain’s Command",
                "description": "Healing yourself with a First Aid Kit or a Healing Draught also heals your nearby allies for 20% of their maximum health. Clears any wounds.",
            },
            {                
                "name": "The More the Merrier!",
                "description": "Increases Power by 5% for every nearby enemy and stacks up to 5 times.",
                "modifier": {
                    "type": "power",
                    "value": 0.05,
                    "conditional": true,
                    "stacks": 5
                }
            },
            {                
                "name": "Limb-Splitter",
                "description": "Increases cleave power by 50%.",
                "modifier": {
                    "type": "cleave",
                    "value": 0.5,
                    "conditional": false
                }
            },
            {                
                "name": "Helborg’s Tutelage",
                "description": "Every 5 hit grants a guaranteed critical strike. Critical strikes can no longer occur randomly."
            },
            {                
                "name": "Mainstay",
                "description": "Deal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 60% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Smiter",
                "description": "The first enemy hit always counts as staggered.\n\nDeal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 40% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Enhanced Power",
                "description": "Increases total Power Level by 7.5% (incorrect in-game). This is calculated before other buffs are applied.",
                "modifier": {
                    "type": "power",
                    "value": 0.07,
                    "conditional": false
                }
            },
            {                
                "name": "Reikland Reaper",
                "description": "Increases Power by 15% when Paced Strikes is active.",
                "modifier": {
                    "type": "power",
                    "value": "0.15",
                    "conditional": true
                }
            },
            {                
                "name": "Enhanced Training",
                "description": "Paced Strikes increases attack speed by 20%. Now requires hitting 4 targets with a single attack to trigger.",
                "modifier": {
                    "type": "attack_speed",
                    "value": "0.20",
                    "conditional": true
                }
            },
            {                
                "name": "Strike Together",
                "description": "Paced Strikes spreads to nearby allies."
            },
            {                
                "name": "Stand Clear",
                "description": "Increases dodge range by 20%.",
                "modifier": {
                    "type": "dodge_range",
                    "value": "0.2",
                    "conditional": false
                }
            },
            {                
                "name": "Blade Barrier",
                "description": "Reduces damage taken by 25% when Paced Strikes is active.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.25,
                    "conditional": true
                }
            },
            {                
                "name": "Black Market Supplies",
                "description": "Increases max ammunition by 30%."
            },
            {                
                "name": "Walk it Off",
                "description": "Morale Boost also reduces damage taken by affected allies by 25% for 10 seconds."
            },
            {                
                "name": "Ready for Action",
                "description": "Reduces cooldown of Morale Boost by 20%.",
                "notes": "",
                "modifier": {
                    "type": "cooldown_reduction",
                    "value": "0.45",
                    "conditional": true
                }
            },
            {                
                "name": "On Yer Feet, Mates!",
                "description": "Morale Boost also revives knocked down allies."
            }
        ]
    },
    {
        "id": 2,
        "name": "Huntsman",
        "codeName": "es_huntsman",
        "heroName": "Markus Kruber",
        "health": 100,
        "passive": {
            "name": "Waste Not, Want Not",
            "description": "Ranged headshots recover 1 ammunition."
        },
        "skill": {
            "name": "Hunter's Prowl",
            "description": "Markus disappears from sight for 6 seconds. When he attacks or fires a ranged weapon he gains a boosted ranged attack damage and shooting his ranged weapon does not consume ammunition.",
            "notes": "Ranged damage boosted 200%",
            "cooldown": 90
        },
        "perks": [
            {
                "name": "Poacher's Mark",
                "description": "Double effective range for ranged weapons."
            },
            {
                "name": "Call out Weakness",
                "description": "Aura that increases critical strike chance by 5%.",
                "modifier": {
                    "type": "crit_chance",
                    "value": 0.5,
                    "conditional": false,
                    "aura": true
                }
            },
            {
                "name": "Deep Pockets",
                "description": "Increases ammunition capacity by 50%.",
                "modifier": {
                    "type": "ammo_capacity",
                    "value": 0.5,
                    "conditional": false
                }
            }
        ],
        "talents": [
            {                
                "name": "Taste of Victory",
                "description": "Staggering enemies with a melee attack grants temporary health. Health gained based stagger strength."
            },
            {                
                "name": "Huntsman’s Tally",
                "description": "Melee killing blows grants temporary health based on the health of the slain enemy."
            },
            {                
                "name": "Taal’s Bounty",
                "description": "Healing yourself with a First Aid Kit or a Healing Draught also heals your nearby allies for 20% of their maximum health. Clears any wounds."
            },
            {                
                "name": "Keep it Coming",
                "description": "Every third ranged hit causes the next shot to consume no ammo.",
                "modifier": {
                    "type": "range_power",
                    "value": 0.3,
                    "conditional": true
                }
            },
            {                
                "name": "Make 'Em Bleed",
                "description": "Critical hits cause enemies to take 20% increased damage for a short duration. Does not stack with similar effects.",
                "notes": "",
                "modifier": {
                    "type": "enemy_damage_buff",
                    "value": 0.2,
                    "conditional": true
                }
            },
            {                
                "name": "One in the Eye",
                "description": "Increased headshot bonus damage by 50%.",
                "modifier": {
                    "type": "headshot_damage",
                    "value": 0.5,
                    "conditional": false
                }
            },
            {                
                "name": "Bulwark",
                "description": "Enemies that you stagger take 10% more damage from melee attacks for 5 seconds.\n\nDeal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 40% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Smiter",
                "description": "The first enemy hit always counts as staggered.\n\nDeal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 40% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Enhanced Power",
                "description": "Increases total Power Level by 7.5% (incorrect in-game). This is calculated before other buffs are applied.",
                "modifier": {
                    "type": "power",
                    "value": 0.07,
                    "conditional": false
                }
            },
            {                
                "name": "Thrill of the Hunt",
                "description": "Ranged headshots Increase reload speed by 20% for 5 seconds.",
                "modifier": {
                    "type": "reload_speed",
                    "value": 0.2,
                    "conditional": true
                }
            },
            {                
                "name": "Makin’ It Look Easy",
                "description": "After scoring a ranged headshot Markus gains 25% increased critical hit chance.",
                "modifier": {
                    "type": "crit_chance",
                    "value": 0.25,
                    "conditional": true
                }
            },
            {                
                "name": "Burst of Enthusiasm",
                "description": "Scoring a ranged headshot grants 2 temporary health. Critical headshots double the effect. Effect can only trigger once per attack."
            },
            {                
                "name": "Shot Crafter",
                "description": "Killing a special restores 10% ammunition.",
                "modifier": {
                    "type": "ammo_restore",
                    "value": 0.1,
                    "conditional": true
                }
            },
            {                
                "name": "Thick Hide",
                "description": "Killing a Special or Elite enemy reduces damage taken by 10%. Stacks 4 times. Taking a hit removes a stack.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": [0.03,0.3],
                    "conditional": false
                }
            },
            {                
                "name": "Longshanks",
                "description": "Increases movement speed by 10%.",
                "modifier": {
                    "type": "move_speed",
                    "value": 0.1,
                    "conditional": false
                }
            },
            {                
                "name": "Blend In",
                "description": "Reduces the cooldown of Prowl by 30%.",
                "modifier": {
                    "type": "cooldown_reduction",
                    "value": 0.3,
                    "conditional": false
                }
            },
            {                
                "name": "Concealed Strikes",
                "description": "Attacking while under the effect of Prowl does not break stealth."
            },
            {                
                "name": "Head Down and Hidden",
                "description": "Increases the duration of Prowl to 10 seconds.",
                "modifier": {
                    "type": "cooldown_duration",
                    "value": 10,
                    "conditional": false
                }
            }
        ]
    },
    {
        "id": 3,
        "name": "Foot Knight",
        "codeName": "es_knight",
        "heroName": "Markus Kruber",
        "health": 150,
        "passive": {
            "name": "Protective Presence",
            "description": "Aura that reduces damage taken by 15%.",
            "modifier": {
                "type": "damage_reduction",
                "value": 0.15,
                "conditional": false,
                "aura": true
            }
        },
        "skill": {
            "name": "Valiant Charge",
            "description": "Markus charges forward, slamming into enemies and knocking them back.",
            "notes": "Staggers bosses",
            "cooldown": 30
        },
        "perks": [
            {
                "name": "Taal's Fortitude",
                "description": "Grant's an extra stamina shield.",
                "modifier": {
                    "type": "stamina",
                    "value": 2,
                    "conditional": false
                }
            },            
            {
                "name": "No Guts, No Glory",
                "description": "Reduces damage taken by 10%.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.1,
                    "conditional": false
                }
            }
        ],
        "talents": [
            {                
                "name": "Back Off, Ugly!",
                "description": "Staggering enemies with a melee attack grants temporary health. Health gained based stagger strength."
            },
            {                
                "name": "Bloody Unstoppable!",
                "description": "Damaging multiple enemies in one swing with a melee weapon grants temporary health. Max 5 enemies."
            },
            {                
                "name": "Templar’s Rally",
                "description": "Healing yourself with a First Aid Kit or a Healing Draught also heals your nearby allies for 20% of their maximum health. Clears any wounds."
            },
            {                
                "name": "Staggering Force",
                "description": "Increases stagger power by 35%.",
                "modifier": {
                    "type": "stagger",
                    "value": 0.35,
                    "conditional": false
                }
            },
            {                
                "name": "Have at Thee!",
                "description": "Staggering an elite enemy increases power by 15% for 10 seconds.",
                "modifier": {
                    "type": "power",
                    "value": 0.15,
                    "conditional": true
                }
            },
            {                
                "name": "Crowd Clearer",
                "description": "Pushing an enemy increases attack speed by 15% for 3 seconds.",
                "modifier": {
                    "type": "attack_speed",
                    "value": 0.15,
                    "conditional": true
                }
            },
            {                
                "name": "Bulwark",
                "description": "Enemies that you stagger take 10% more damage from melee attacks for 5 seconds.\n\nDeal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 40% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Mainstay",
                "description": "Deal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 60% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Enhanced Power",
                "description": "Increases total Power Level by 7.5% (incorrect in-game). This is calculated before other buffs are applied.",
                "modifier": {
                    "type": "power",
                    "value": 0.07,
                    "conditional": false
                }
            },
            {                
                "name": "Rock of the Reikland",
                "description": "Protective Presence's size is doubled and also grants 20% block cost reduction.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.2,
                    "conditional": false,
                    "aura": true
                }
            },
            {                
                "name": "That's Blood Teamwork!",
                "description": "Increases damage reduction from Protective Presence by 5.0% for each nearby ally.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.05,
                    "conditional": false,
                    "aura": true
                }
            },
            {                
                "name": "Comrades in Arms",
                "description": "Kruber gains 10.0% increased power. The closest ally to Kruber gains 50.0% damage reduction and 10.0% increased power. Passive aura from Protective Presence no longer affects allies.",
                "modifier": {
                    "type": "power",
                    "value": 0.1,
                    "conditional": false
                }
            },
            {                
                "name": "It’s Hero Time",
                "description": "Resets the cooldown on Valiant Charge when an ally is incapacitated",
                "modifier": {
                    "type": "move_speed",
                    "value": 0.3,
                    "conditional": true
                }
            },
            {                
                "name": "Counter-Punch",
                "description": "Blocking an attack removes the stamina cost of pushing for 1 second."
            },
            {                
                "name": "Inspiring Blow",
                "description": "Staggering an Elite enemy accelerates the cooldown of nearby allies by 100.0% for 0.5 seconds.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.05,
                    "conditional": true,
                    "stacks": 3
                }
            },
            {                
                "name": "Numb to Pain",
                "description": "Valiant Charge grants invulnerablility for 3 seconds.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 1.0,
                    "conditional": true
                }
            },
            {                
                "name": "Battering Ram",
                "description": "Doubles the width of Valiant Charge and allows Kruber to charge through great foes.",
                "modifier": {
                    "type": "enemy_damage",
                    "value": 0.2,
                    "conditional": true
                }
            },
            {                
                "name": "Bull of Ostland!",
                "description": "Each enemy hit with Valiant Charge grants 3% attack speed for 10 seconds. Stacks up to 10 times.",
                "modifier": {
                    "type": "attack_speed",
                    "value": 0.03,
                    "conditional": true,
                    "stacks": 10
                }
            }
        ]
    },
    {
        "id": 16,
        "name": "Grail Knight",
        "codeName": "es_questingknight",
        "heroName": "Markus Kruber",
        "health": 150,
        "passive": {
            "name": "The Lady's Duty",
            "description": "Upon entering a mission, the Lady of the Lake grants 2 random Duties for the Grail Knight and his party to complete. Upon completion of a Duty, the party is granted a Benison for the rest of the mission.",
            "modifier": {
                "type": "damage_reduction",
                "value": 0.15,
                "conditional": false,
                "aura": true
            }
        },
        "skill": {
            "name": "Blessed Blade",
            "description": "Markus equips a blessed blade and slashes down with great force, smiting any evil creature caught in its wake and dealing heavy damage.",
            "notes": "Staggers bosses",
            "cooldown": 40
        },
        "perks": [
            {
                "name": "Knight's Challenge",
                "description": "Deals 25% more damage to the first enemy hit (incorrect in-game).",
                "modifier": {
                    "type": "stamina",
                    "value": 2,
                    "conditional": false
                }
            },            
            {
                "name": "Thirst for Glory ",
                "description": "Increases movement speed by 10% (incorrect in-game).",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.1,
                    "conditional": false
                }
            },
            {
                "name": "Bastion of Bretonnia ",
                "description": "Markus can use shields to block Warpfire Thrower attacks.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.1,
                    "conditional": false
                }
            }
        ],
        "talents": [
            {                
                "name": "Lady's Generosity ",
                "description": "Staggering enemies with a melee attack grants temporary health. Health gained based stagger strength."
            },
            {                
                "name": "Lady's Wrath ",
                "description": "Melee killing blows restore temporary health based on the health of the slain enemy."
            },
            {                
                "name": "Gift of the Grail",
                "description": "Healing yourself with a First Aid Kit or a Healing Draught also heals your nearby allies for 20% of their maximum health. Clears any wounds."
            },
            {                
                "name": "Virtue of the Ideal ",
                "description": "Killing enemies increases power level by 10% for 10 seconds. Stacks up to 3 times.",
                "modifier": {
                    "type": "stagger",
                    "value": 0.35,
                    "conditional": false
                }
            },
            {                
                "name": "Virtue of Knightly Temper ",
                "description": "Critical strikes instantly slay enemies if their current health is less than 4 times the amount of damage of the critical strike. Half effect versus Lords and Monsters.",
                "modifier": {
                    "type": "power",
                    "value": 0.15,
                    "conditional": true
                }
            },
            {                
                "name": "Virtue of Heroism",
                "description": "Damage (and not power level) of heavy attacks increased by 25%.",
                "modifier": {
                    "type": "attack_speed",
                    "value": 0.15,
                    "conditional": true
                }
            },
            {                
                "name": "Bulwark",
                "description": "Enemies that you stagger take 10% more damage from melee attacks for 5 seconds.\n\nDeal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 40% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Smiter",
                "description": "The first enemy hit always counts as staggered. Deal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 40% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Enhanced Power",
                "description": "Increases total Power Level by 7.5% (incorrect in-game). This is calculated before other buffs are applied.",
                "modifier": {
                    "type": "power",
                    "value": 0.07,
                    "conditional": false
                }
            },
            {                
                "name": "Virtue of Duty ",
                "description": "The Lady's Favour grants an additional Quest.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.2,
                    "conditional": false,
                    "aura": true
                }
            },
            {                
                "name": "Virtue of Purity ",
                "description": "Increases the potency of the blessings rewarded upon completing a Quest by 50% (doubles the effect of regeneration).",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.05,
                    "conditional": false,
                    "aura": true
                }
            },
            {                
                "name": "Virtue of the Penitent",
                "description": "The Lady's Favour grants a repeatable Quest that rewards a Potion of Strength to Markus upon completion. (Kill 200 enemies. Potion drops on the floor if Markus's potion slot is occupied)",
                "modifier": {
                    "type": "power",
                    "value": 0.1,
                    "conditional": false
                }
            },
            {                
                "name": "Virtue of Stoicism ",
                "description": "50% of damage taken is regenerated as temporary health after 5 seconds. ",
                "modifier": {
                    "type": "move_speed",
                    "value": 0.3,
                    "conditional": true
                }
            },
            {                
                "name": "Virtue of Discipline",
                "description": "Timed blocks increase power level by 20% for 6 seconds."
            },
            {                
                "name": "Virtue of the Joust",
                "description": "Increases push arc and stamina regeneration by 30%. ",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.05,
                    "conditional": true,
                    "stacks": 3
                }
            },
            {                
                "name": "Virtue of Audacity",
                "description": "Adds a second stab attack to Blessed Blade, dealing devastating single target damage.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 1.0,
                    "conditional": true
                }
            },
            {                
                "name": "Virtue of the Impetuous Knight ",
                "description": "Killing an enemy with Blessed Blade increases movement speed by 35% for 15 seconds. ",
                "modifier": {
                    "type": "enemy_damage",
                    "value": 0.2,
                    "conditional": true
                }
            },
            {                
                "name": "Virtue of Confidence ",
                "description": "Change Blessed Blade to a horizontal slash that cleaves through and staggers multiple enemies.",
                "modifier": {
                    "type": "attack_speed",
                    "value": 0.03,
                    "conditional": true,
                    "stacks": 10
                }
            }
        ]
    },
    {
        "id": 4,
        "name": "Ranger Veteran",
        "codeName": "dr_ranger",
        "heroName": "Bardin Goreksson",
        "health": 100,
        "passive": {
            "name": "Survivalist",
            "description": "Specials drop ammunition pickups on death that restore 10% of maximum ammo when picked up."
        },
        "skill": {
            "name": "Disengage",
            "description": "Bardin deploys a smoke bomb for 10 seconds that conceals him from enemies whilst he stays inside the cloud. Also gains increased range attack power while concealed.",
            "cooldown": 120
        },
        "perks": [
            {
                "name": "Loaded for Battle",
                "description": "Increases ammo capacity by 50%",
                "modifier": {
                    "type": "ammo_capacity",
                    "value": 0.5,
                    "conditional": false
                }
            },
            {
                "name": "Fast Hands",
                "description": "Increases reload speed by 15%.",
                "modifier": {
                    "type": "reload_speed",
                    "value": 0.15,
                    "conditional": false
                }
            },
            {
                "name": "Ingenious Improvisation",
                "description": "Using any Healing Supplies, Potions or Grenades has a 10% chance to not consume the item. "
            }
        ],
        "talents": [
            {                
                "name": "Roots Running Deep",
                "description": "Staggering enemies with a melee attack grants temporary health. Health gained based stagger strength."
            },
            {                
                "name": "Ranger Reaper",
                "description": "Damaging multiple enemies in one swing with a melee weapon grants temporary health. Max 5 enemies."
            },
            {                
                "name": "Hardy Heart",
                "description": "Healing yourself with a First Aid Kit or a Healing Draught also heals your nearby allies for 20% of their maximum health. Clears any wounds."
            },
            {                
                "name": "Last Resort",
                "description": "Bardin gains a 25% Power increase when out of ammunition.",
                "modifier": {
                    "type": "power",
                    "value": 0.25,
                    "conditional": true
                }
            },
            {                
                "name": "Master of Improvisation",
                "description": "Reloading a weapon reduces the cooldown of Disengage by 2 seconds."
            },
            {                
                "name": "Foe-Feller",
                "description": "Increases attack speed by 5%.",
                "modifier": {
                    "type": "attack_speed",
                    "value": 0.05,
                    "conditional": false
                }
            },
            {                
                "name": "Bulwark",
                "description": "Enemies that you stagger take 10% more damage from melee attacks for 5 seconds.\n\nDeal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 40% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Mainstay",
                "description": "Deal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 60% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Enhanced Power",
                "description": "Increases total Power Level by 7.5% (incorrect in-game). This is calculated before other buffs are applied."
            },
            {                
                "name": "Drunken Brawler",
                "description": "Killing a Special grants a 50.0% chance to drop a bottle of ale. Ale grants 3.0% attack speed and reduces damage taken by 4.0% for 5 minutes when consumed. Can stack 3 times."
            },
            {                
                "name": "Grugni’s Cunning",
                "description": "Increases ammunition restored by Survivalist caches to 30%."
            },
            {                
                "name": "Scavenger",
                "description": "Killing a special has a 20% chance to drop a potion or bomb instead of a Survivalist cache."
            },
            {                
                "name": "No Dawdling!",
                "description": "Increases movement speed by 10%.",
                "modifier": {
                    "type": "move_speed",
                    "value": 0.1,
                    "conditional": false
                }
            },
            {                
                "name": "Exuberance",
                "description": "Bardin takes 30.0% less damage from behind. Whenever he scores a headshot, this bonus applies to all damage taken for 7 seconds.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.3,
                    "conditional": true
                }
            },
            {                
                "name": "Firing Fury",
                "description": "Hitting 2 enemies with one ranged attack increases speed of Bardins next reload by 35.0%.",
                "modifier": {
                    "type": "reload_speed",
                    "value": 0.35,
                    "conditional": true
                }
            },
            {                
                "name": "Exhilarating Vapours",
                "description": "Allies within Bardin's smoke gain 8.0% attack speed. They also gain 3 temporary health per second.",
                "modifier": {
                    "type": "cooldown_duration",
                    "value": 15,
                    "conditional": false
                }
            },
            {                
                "name": "Surprise Guest",
                "description": "Disengages stealth does not break on moving outside of the smoke cloud."
            },
            {                
                "name": "Ranger’s Parting Gift",
                "description": "Activating Diseangage causes the next bomb Bardin throws within the duration of the ability to not be consumed."
            }
        ]
    },
    {
        "id": 5,
        "name": "Ironbreaker",
        "codeName": "dr_ironbreaker",
        "heroName": "Bardin Goreksson",
        "health": 150,
        "passive": {
            "name": "Gromril Armour",
            "description": "Completetly absorb one hit every 20 seconds",
            "modifier": {
                "type": "damage_reduction",
                "value": 1,
                "conditional": true
            }
        },
        "skill": {
            "name": "Impenetrable",
            "description": "Bardin taunts all nearby man-sized enemies, gains increased defence and can block any attack for the next 10 seconds.",
            "notes": "Staggers bosses",
            "cooldown": 120
        },
        "perks": [
            {
                "name": "Dawrf-Forged",
                "description": "Reduces damage taken by 30%.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.3,
                    "conditional": false
                }
            },
            {
                "name": "Doughty",
                "description": "Grants an extra stamina shield.",
                "modifier": {
                    "type": "stamina",
                    "value": 2,
                    "conditional": false
                }
            },
            {
                "name": "Resilient",
                "description": "Decreases stun duration after getting hit by an attack by 50%."
            }
        ],
        "talents": [
            {                
                "name": "Rock-Breaker",
                "description": "Staggering enemies with a melee attack grants temporary health. Health gained based stagger strength."
            },
            {                
                "name": "Grudge-Borne",
                "description": "Melee killing blows restore temporary health based on the health of the slain enemy."
            },
            {                
                "name": "Hearthguard",
                "description": "Healing yourself with a First Aid Kit or a Healing Draught also heals your nearby allies for 20% of their maximum health. Clears any wounds."
            },
            {                
                "name": "Under Pressure",
                "description": "Drake Fire damage increases from -80.0% to 120.0% and ranged attack speed reduces from 100.0% to -50.0% depending on overcharge. Removes overcharge slowdown."
            },
            {                
                "name": "Blood of Grimnir",
                "description": "Each nearby ally increases power by 5.0%.",
                "modifier": {
                    "type": "power",
                    "value": 0.05,
                    "conditional": true,
                    "stacks": 3
                }
            },
            {                
                "name": "Rune-Etched Shield",
                "description": "Blocking an attack increases Bardin's power (and that of nearby allies) by 2.0% for 10 seconds. Stacks 5 times.",
                "modifier": {
                    "type": "power",
                    "value": 0.05,
                    "conditional": true,
                    "stacks": 5
                }
            },
            {                
                "name": "Bulwark",
                "description": "Enemies that you stagger take 10% more damage from melee attacks for 5 seconds.\n\nDeal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 40% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Smiter",
                "description": "The first enemy hit always counts as staggered.\n\nDeal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 40% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Enhanced Power",
                "description": "Increases total Power Level by 7.5% (incorrect in-game). This is calculated before other buffs are applied."
            },
            {                
                "name": "Vengeance",
                "description": "Periodically generate stacks of Rising Anger every 7 seconds while Gromril is active. When Gromril is lost, gain 8.0% attack speed per stack of Rising Anger.",
                "modifier": {
                    "type": "stamina_regen",
                    "value": 0.5,
                    "conditional": true
                }
            },
            {                
                "name": "Gromril Curse",
                "description": "When Gromril Armour is removed all nearby enemies are knocked back."
            },
            {                
                "name": "Tunnel Fighter",
                "description": "Reduces the cooldown of Gromril Armour to 10 seconds.",
                "modifier": {
                    "type": "cooldown_reduction",
                    "value": 7,
                    "conditional": true
                }
            },
            {                
                "name": "Dawi Defiance",
                "description": "When Bardins guard is broken there is a 50.0% chance to instantly restore all stamina."
            },
            {                
                "name": "The Rolling Mountain",
                "description": "Killing enemies with melee attacks while on full stamina reduces the cooldown of Impenetrable by 2.0%.",
                "modifier": {
                    "type": "cooldown_reduction",
                    "value": 0.02,
                    "conditional": true
                }
            },
            {                
                "name": "Miner’s Rythm",
                "description": "After landing a charged attack Bardin recovers stamina 40.0% faster for 2 seconds.",
                "modifier": {
                    "type": "stamina_regen",
                    "value": 0.4,
                    "conditional": true
                }
            },
            {                
                "name": "Drengbarazi Oath",
                "description": "Impenetrable increases power of nearby allies by 20.0% for 10 seconds."
            },
            {                
                "name": "Oi! Wazzok!",
                "description": "Impenetrable taunt now forces monsters to attack Bardin."
            },
            {                
                "name": "Booming Taunt",
                "description": "Increases the radius of Impenetrables taunt by 15.0%. Increases the duration of Impenetrable to 15 seconds.",
                "modifier": {
                    "type": "cooldown_duration",
                    "value": 15,
                    "conditional": false
                }
            }
        ]
    },
    {
        "id": 6,
        "name": "Slayer",
        "codeName": "dr_slayer",
        "heroName": "Bardin Goreksson",
        "health": 125,
        "passive": {
            "name": "Trophy Hunter",
            "description": "Hitting an enemy grants a stacking damage buff. Increases damage by 10%, stacking 3 times. Buff lasts 2 seconds.",
            "modifier": {
                "type": "power",
                "value": 0.1,
                "conditional": true,
                "stacks": 3
            }
        },
        "skill": {
            "name": "Leap",
            "description": "Bardin leaps forward to stun a target, and gains 30% increased attack speed for 10 seconds",
            "cooldown": 40,
            "modifier": {
                "type": "attack_speed",
                "value": 0.3,
                "conditional": true
            }
        },
        "perks": [
            {
                "name": "Path of Carnage",
                "description": "Increases attack speed by 7.5%.",
                "modifier": {
                    "type": "attack_speed",
                    "value": 0.075,
                    "conditional": false
                }
            },
            {
                "name": "Drengi Grit",
                "description": "Charged attacks can't be interrupted by damage."
            }
        ],
        "talents": [
            {                
                "name": "Doomseeker",
                "description": "Damaging multiple enemies in one swing with a melee weapon grants temporary health. Max 5 enemies."
            },
            {                
                "name": "Slayer’s Fury",
                "description": "Melee killing blows restore temporary health based on the health of the slain enemy."
            },
            {                
                "name": "Infectious Fortitude",
                "description": "Healing yourself with a First Aid Kit or a Healing Draught also heals your nearby allies for 20% of their maximum health. Clears any wounds."
            },
            {                
                "name": "A Thousand Cuts",
                "description": "Wielding one-handed weapons in both slots increases attack speed by 10%. Dual weapons count as one-handed.",
                "modifier": {
                    "type": "attack_speed",
                    "value": 0.1,
                    "conditional": false
                }
            },
            {                
                "name": "Skull-Splitter",
                "description": "Wielding two-handed weapons in both slots increases power by 15%.",
                "modifier": {
                    "type": "power",
                    "value": 0.15,
                    "conditional": false
                }
            },
            {                
                "name": "Hack and Slash",
                "description": "Increases critical hit chance by 5%.",
                "modifier": {
                    "type": "crit_chance",
                    "value": 0.05,
                    "conditional": false
                }
            },
            {                
                "name": "Smiter",
                "description": "The first enemy hit always counts as staggered.\n\nDeal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 40% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Mainstay",
                "description": "Deal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 60% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Enhanced Power",
                "description": "Increases total Power Level by 7.5% (incorrect in-game). This is calculated before other buffs are applied."
            },
            {                
                "name": "Impatience",
                "description": "Each stack of Trophy Hunter increases movement speed by 10%.",
                "modifier": {
                    "type": "move_speed",
                    "value": 0.1,
                    "conditional": true,
                    "stacks": 3
                }
            },
            {                
                "name": "High Tally",
                "description": "Increases maximum stacks of Trophy Hunter by 1."
            },
            {                
                "name": "Adrenaline Surge",
                "description": "On max stacks, Trophy Hunter grants cooldown reduction for Leap."
            },
            {                
                "name": "Oblivious to Pain",
                "description": "Damage taken from Elite enemies or Monsters is reduced to 10 damage or half of its original value whichever is highest."
            },
            {                
                "name": "Grimir’s Focus",
                "description": "Hitting an enemy with a charged attack reduces damage taken by 40% for 5 seconds.",
                "notes": "Light attack swings count as charging."
            },
            {                
                "name": "Barge",
                "description": "Effective dodges pushes nearby small enemies out of the way."
            },
            {                
                "name": "Crunch!",
                "description": "Increases stagger effect when landing on enemies using Leap by 100%."
            },
            {                
                "name": "Dawi-Drop",
                "description": "Increases attack damage while airborne during Leap by 150%.",
                "modifier": {
                    "type": "power",
                    "value": 1.5,
                    "conditional": true
                }
            },
            {                
                "name": "No Escape",
                "description": "Leap’s attack speed buff also increases movement speed by 25% for the duration.",
                "modifier": {
                    "type": "move_speed",
                    "value": 0.25,
                    "conditional": true
                }
            }
        ]
    },
    {
        "id": 17,
        "name": "Foot Knight",
        "codeName": "es_knight",
        "heroName": "Markus Kruber",
        "health": 150,
        "passive": {
            "name": "Protective Presence",
            "description": "Aura that reduces damage taken by 15%.",
            "modifier": {
                "type": "damage_reduction",
                "value": 0.15,
                "conditional": false,
                "aura": true
            }
        },
        "skill": {
            "name": "Valiant Charge",
            "description": "Markus charges forward, slamming into enemies and knocking them back.",
            "notes": "Staggers bosses",
            "cooldown": 30
        },
        "perks": [
            {
                "name": "Taal's Fortitude",
                "description": "Grant's an extra stamina shield.",
                "modifier": {
                    "type": "stamina",
                    "value": 2,
                    "conditional": false
                }
            },            
            {
                "name": "No Guts, No Glory",
                "description": "Reduces damage taken by 10%.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.1,
                    "conditional": false
                }
            }
        ],
        "talents": [
            {                
                "name": "Back Off, Ugly!",
                "description": "Staggering an enemy with a melee attack grants temporary health. Health gained is based on the strength of the stagger."
            },
            {                
                "name": "Bloody Unstoppable!",
                "description": "Striking multiple enemies in one swing grants temporary health based on the number of targets hit. Max 5 enemies."
            },
            {                
                "name": "Templar’s Rally",
                "description": "Healing yourself with a First Aid Kit or a Healing Draught also heals your nearby allies for 20% of their maximum health. Clears any wounds."
            },
            {                
                "name": "Staggering Force",
                "description": "Increases stagger power by 35%.",
                "modifier": {
                    "type": "stagger",
                    "value": 0.35,
                    "conditional": false
                }
            },
            {                
                "name": "Have at Thee!",
                "description": "Staggering an elite enemy increases power by 15% for 10 seconds.",
                "modifier": {
                    "type": "power",
                    "value": 0.15,
                    "conditional": true
                }
            },
            {                
                "name": "Crowd Clearer",
                "description": "Pushing an enemy increases attack speed by 15% for 3 seconds.",
                "modifier": {
                    "type": "attack_speed",
                    "value": 0.15,
                    "conditional": true
                }
            },
            {                
                "name": "Bulwark",
                "description": "Enemies that you stagger take 10% more damage from melee attacks for 5 seconds.\n\nDeal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 40% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Mainstay",
                "description": "Deal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 60% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Enhanced Power",
                "description": "Increases total Power Level by 7.5% (incorrect in-game). This is calculated before other buffs are applied.",
                "modifier": {
                    "type": "power",
                    "value": 0.07,
                    "conditional": false
                }
            },
            {                
                "name": "Rock of the Reikland",
                "description": "Protective Presence also grants 20% block cost reduction.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.2,
                    "conditional": false,
                    "aura": true
                }
            },
            {                
                "name": "Defensive Formation",
                "description": "Increases damage reduction from Protective Presence by 5%.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.05,
                    "conditional": false,
                    "aura": true
                }
            },
            {                
                "name": "Taal’s Champion",
                "description": "Increases power level by 10%. Removes damage reduction and no longer effects allies.",
                "modifier": {
                    "type": "power",
                    "value": 0.1,
                    "conditional": false
                }
            },
            {                
                "name": "It’s Hero Time",
                "description": "Increases movement speed by 30% when an ally is incapcitated.",
                "modifier": {
                    "type": "move_speed",
                    "value": 0.3,
                    "conditional": true
                }
            },
            {                
                "name": "Counter-Punch",
                "description": "Blocking an attack removes the stamina cost of pushing for 2 seconds."
            },
            {                
                "name": "That’s Bloody Teamwork!",
                "description": "Reduces damage taken by 5% for each nearby ally.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.05,
                    "conditional": true,
                    "stacks": 3
                }
            },
            {                
                "name": "Numb to Pain",
                "description": "Valiant Charge grants invulnerablility for 3 seconds.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 1.0,
                    "conditional": true
                }
            },
            {                
                "name": "Trample",
                "description": "Enemies hit by Valiant Charge takes 20% increased damage for 5 seconds. Does not stack with similar effects.",
                "modifier": {
                    "type": "enemy_damage",
                    "value": 0.2,
                    "conditional": true
                }
            },
            {                
                "name": "Bull of Ostland!",
                "description": "Each enemy hit with Valiant Charge grants 3% attack speed for 10 seconds. Stacks up to 10 times.",
                "modifier": {
                    "type": "attack_speed",
                    "value": 0.03,
                    "conditional": true,
                    "stacks": 10
                }
            }
        ]
    },
    {
        "id": 7,
        "name": "Waystalker",
        "codeName": "we_waywatcher",
        "heroName": "Kerillian",
        "health": 100,
        "passive": {
            "name": "Amaranthe",
            "description": "Kerillian regenerates 3 health every 10 seconds when below half health."
        },
        "skill": {
            "name": "Trueshot Volley",
            "description": "Kerillian shoots a volley of arrows that seek out enemies in her path.",
            "cooldown": 80
        },
        "perks": [
            {
                "name": "Arrow-storm",
                "description": "Increases ammo capacity by 100%.",
                "modifier": {
                    "type": "ammo_capacity",
                    "value": 1,
                    "conditional": false
                }
            },
            {
                "name": "Waywatcher's Bow",
                "description": "Double effective range for ranged weapons."
            },
            {
                "name": "Asrai Vigil",
                "description": "Ranged weapon zoom. Bound to weapon special by default."
            }
        ],
        "talents": [
            {                
                "name": "Weavebond",
                "description": "Melee critical strikes and headshots restore 2 temporary health. Critical headshots restores twice as much."
            },
            {                
                "name": "Dryad’s Thirst",
                "description": "Damaging multiple enemies in one swing with a melee weapon grants temporary health. Max 5 enemies."
            },
            {                
                "name": "Ariel’s Boon",
                "description": "Healing yourself with a First Aid Kit or a Healing Draught also heals your nearby allies for 20% of their maximum health. Clears any wounds."
            },
            {                
                "name": "Blood Shot",
                "description": "After killing an enemy with a melee attack Kerillian fires an additional arrow with her next ranged attack made within 10 seconds."
            },
            {                
                "name": "Serrated Shots",
                "description": "Enemies hit by non-poisonous ranged attacks bleed for extra damage."
            },
            {                
                "name": "Drakira’s Alacrity",
                "description": "Ranged headshots increases attack speed by 15% for 5 seconds.",
                "modifier": {
                    "type": "attack_speed",
                    "value": 0.15,
                    "conditional": true
                }
            },
            {                
                "name": "Mainstay",
                "description": "The first enemy hit always counts as staggered.\n\nDeal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 40% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Assassin",
                "description": "Deal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Headshots and critical hits instead inflict 40% bonus damage, as do strikes against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Enhanced Power",
                "description": "Increases total Power Level by 7.5% (incorrect in-game). This is calculated before other buffs are applied."
            },
            {                
                "name": "Isha’s Embrace",
                "description": "Increases Kerillian’s health regenerated from Amaranthe by 50%."
            },
            {                
                "name": "Spirit Arrows",
                "description": "Amaranthe reduces the cooldown of Trueflight Volley by 5.0% every tick. No longer restores health."
            },
            {                
                "name": "Rejuvenating Locus",
                "description": "Amaranthe also affects the other members of the party."
            },
            {                
                "name": "Fervent Huntress",
                "description": "Killing a special increases movement speed by 15.0% for 10 seconds.",
                "modifier": {
                    "type": "move_speed",
                    "value": 0.15,
                    "conditional": true
                }
            },
            {                
                "name": "Ricochet",
                "description": "Kerillian's arrows now richochet, bouncing up to 3 times or until it hits an enemy."
            },
            {                
                "name": "Asrai Focus",
                "description": "Reduces the cooldown of Trueshot Volley by 20%.",
                "modifier": {
                    "type": "cooldown_reduction",
                    "value": 0.2,
                    "conditional": false
                }
            },
            {                
                "name": "Piercing Shot",
                "description": "Trueshot Volley fires one piercing shot dealing heavy damage. Headshot refunds 100.0% cooldown."
            },
            {                
                "name": "Loaded Bow",
                "description": "Trueshot Volley fires an additional projectile."
            },
            {                
                "name": "Kurnous’ Reward",
                "description": "Killing a special or elite enemy with Trueshot Volley restores 30.0% ammunition."
            }
        ]
    },
    {
        "id": 8,
        "name": "Handmaiden",
        "codeName": "we_maidenguard",
        "heroName": "Kerillian",
        "health": 125,
        "passive": {
            "name": "The Dance of Seasons",
            "description": "Increased dodge distance by 15.",
            "modifier": {
                "type": "dodge_distance",
                "value": 0.15,
                "conditional": false
            }
        },
        "skill": {
            "name": "Dash",
            "description": "Kerillian swiftly dashs forward, moving through enemies.",
            "cooldown": 20
        },
        "perks": [
            {
                "name": "Renewal",
                "description": "Aura that increases stamina regeneration by 100%.",
                "modifier": {
                    "type": "stamina_regen",
                    "value": 1,
                    "conditional": false,
                    "aura": true
                }
            },
            {
                "name": "Ariel's Benison",
                "description": "Increase Kerillian's revive speed by 50%. When Kerillian revives allies, she heals them for 20 health."
            }
        ],
        "talents": [
            {                
                "name": "Spirit Echo",
                "description": "Damaging multiple enemies in one swing with a melee weapon grants temporary health. Max 5 enemies."
            },
            {                
                "name": "Martial Blessing",
                "description": "Melee killing blows restore temporary health based on the health of the slain enemy."
            },
            {                
                "name": "Eternal Blossom",
                "description": "Healing yourself with a First Aid Kit or a Healing Draught also heals your nearby allies for 20% of their maximum health. Clears any wounds."
            },
            {                
                "name": "Focused Spirit",
                "description": "After not taking damage for 10 seconds, increases Kerillian's power by 15.0%. Reset upon taking damage.",
                "modifier": {
                    "type": "power",
                    "value": 0.1,
                    "conditional": true
                }
            },
            {                
                "name": "Oak Stance",
                "description": "Increases critical strike chance by 5.0%.",
                "modifier": {
                    "type": "crit_chance",
                    "value": 0.05,
                    "conditional": false
                }
            },
            {                
                "name": "Asrai Alacrity",
                "description": "Blocking an attack or pushing grants Kerillian's next two strikes 30.0% attack speed and 10.0% power.",
                "modifier": {
                    "type": "cooldown_reduction",
                    "value": 0.15,
                    "conditional": true,
                    "stacks": 3
                }
            },
            {                
                "name": "Smiter",
                "description": "The first enemy hit always counts as staggered.\n\nDeal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 40% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Mainstay",
                "description": "Deal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 60% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Enhanced Power",
                "description": "Increases total Power Level by 7.5% (incorrect in-game). This is calculated before other buffs are applied."
            },
            {                
                "name": "Willow Stance",
                "description": "Dodging grants 5.0% attack speed for 6 seconds. Stacks up to 3 times.",
                "modifier": {
                    "type": "attack_speed",
                    "value": 0.05,
                    "conditional": true,
                    "stacks": 3
                }
            },
            {                
                "name": "Dance of Blades",
                "description": "Dodging while blocking increases dodge range by 20.0%. Dodging while not blocking increases the power of Kerillian's next strike by 10.0%.",
                "modifier": {
                    "type": "dodge_distance",
                    "value": 0.2,
                    "conditional": false
                }
            },
            {                
                "name": "Wraith-Walk",
                "description": "Kerillian's dodges can now pass through enemies."
            },
            {                
                "name": "Heart of Oak",
                "description": "Increases max health by 15.0%.",
                "modifier": {
                    "type": "health",
                    "value": 0.15,
                    "conditional": false
                }
            },
            {                
                "name": "Birch Stance",
                "description": "Reduces block cost by 30.0%.",
                "modifier": {
                    "type": "block_reduction",
                    "value": 0.3,
                    "conditional": false
                }
            },
            {                
                "name": "Quiver of Plenty",
                "description": "Increases ammunition amount by 40.0%.",
                "modifier": {
                    "type": "ammo_capacity",
                    "value": 0.4,
                    "conditional": false
                }
            },
            {                
                "name": "Gift of Ladrielle",
                "description": "Kerillian disappears from enemy perception for 2 seconds after using Dash."
            },
            {                
                "name": "Bladedancer",
                "description": "Dashing through an enemy causes them to bleed for significant damage over time."
            },
            {                
                "name": "Power from Pain",
                "description": "Each enemy hit with Dash grants 5.0% critical strike chance for 15 seconds. Stacks up to 5 times.",
                "modifier": {
                    "type": "crit_chance",
                    "value": 0.05,
                    "conditional": true,
                    "stacks": 5
                }
            }
        ]
    },
    {
        "id": 9,
        "name": "Shade",
        "codeName": "we_shade",
        "heroName": "Kerillian",
        "health": 100,
        "passive": {
            "name": "Murderous Prowess",
            "description": "Critical hit backstabs instantly slay man-sized enemies."
        },
        "skill": {
            "name": "Infiltrate",
            "description": "Kerillian becomes undetectable and can pass through enemies. Lasts for 5 seconds, or until she attacks.",
            "notes": "First attack while still stealthed will get a damage bonus.",
            "cooldown": 60
        },
        "perks": [
            {
                "name": "Assassin's Blade",
                "description": "50% additional damage when attacking enemies with melee attacks from behind.",
                "modifier": {
                    "type": "melee_power",
                    "value": 0.5,
                    "conditional": true
                }
            },
            {
                "name": "Grim Fortune (unlisted)",
                "description": "Increases critical strike chance by 5%.",
                "modifier": {
                    "type": "crit_chance",
                    "value": 0.05,
                    "conditional": false
                }
            }
        ],
        "talents": [
            {                
                "name": "Bleak Vigour",
                "description": "Melee critical strikes and headshots restore 2 temporary health. Critical headshots restores twice as much."
            },
            {                
                "name": "Khaine’s Thirst",
                "description": "Melee killing blows restore temporary health based on the health of the slain enemy."
            },
            {                
                "name": "Blood Kin",
                "description": "Healing yourself with a First Aid Kit or a Healing Draught also heals your nearby allies for 20% of their maximum health. Clears any wounds."
            },
            {                
                "name": "Cruelty",
                "description": "Increases critical strike damage bonus by 50%.",
                "modifier": {
                    "type": "crit_power",
                    "value": 0.5,
                    "conditional": false
                }
            },
            {                
                "name": "Exploit Weakness",
                "description": "Increases damage by 20% to poisoned or bleeding enemies.",
                "modifier": {
                    "type": "power",
                    "value": 0.2,
                    "conditional": true
                }
            },
            {                
                "name": "Exquisite Huntress",
                "description": "Headshots increase headshot damage bonus by 10% for 5 seconds. Stacks up to 10 times.",
                "modifier": {
                    "type": "headshot_damage",
                    "value": 0.1,
                    "conditional": true,
                    "stacks": 10
                }
            },
            {                
                "name": "Smiter",
                "description": "Deal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Headshots and critical hits instead inflict 40% bonus damage, as do strikes against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Assassin",
                "description": "The first enemy hit always counts as staggered.\n\nDeal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 40% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Enhanced Power",
                "description": "Increases total Power Level by 7.5% (incorrect in-game). This is calculated before other buffs are applied.",
                "modifier": {
                    "type": "power",
                    "value": 0.07,
                    "conditional": false
                }
            },
            {                
                "name": "Ereth Khial’s Herald",
                "description": "Assassin’s Blade is increased to 75% additional damage when attacking enemies from behind.",
                "modifier": {
                    "type": "power",
                    "value": 0.75,
                    "conditional": false
                }
            },
            {                
                "name": "Vanish",
                "description": "Killing an enemy with a backstab grants stealth for 3 seconds."
            },
            {                
                "name": "Bloodfletcher",
                "description": "Backstabs return 1 bolt or arrow."
            },
            {                
                "name": "Blood Drinker",
                "description": "Critical hits reduce damage taken by 20% for 5 seconds.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.2,
                    "conditional": true
                }
            },
            {                
                "name": "Spring-Heeled Assassin",
                "description": "Critical hits increase movement speed by 20% for 5 seconds.",
                "modifier": {
                    "type": "move_speed",
                    "value": 0.2,
                    "conditional": true
                }
            },
            {                
                "name": "Gladerunner",
                "description": "Increases movement speed by 10%.",
                "modifier": {
                    "type": "move_speed",
                    "value": 0.1,
                    "conditional": false
                }
            },
            {                
                "name": "Cloak of Mist",
                "description": "Infiltrate cooldown is reduced by 45%. After leaving stealth, Kerillian gains 100% melee critical strike chance for 4 seconds, but no longer gains a damage bonus on attacking.",
                "modifier": {
                    "type": "cooldown_reduction",
                    "value": 0.45,
                    "conditional": false
                }
            },
            {                
                "name": "Shadowstep",
                "description": "Infiltrate causes Kerillian to blink forward, passing through enemies."
            },
            {                
                "name": "Cloak of Pain",
                "description": "Hitting an enemy while under the effect of Infilitrate does not break stealth. Second attack does not grant bonus damage. Can only trigger once."
            }
        ]
    },
    {
        "id": 18,
        "name": "Foot Knight",
        "codeName": "es_knight",
        "heroName": "Markus Kruber",
        "health": 150,
        "passive": {
            "name": "Protective Presence",
            "description": "Aura that reduces damage taken by 15%.",
            "modifier": {
                "type": "damage_reduction",
                "value": 0.15,
                "conditional": false,
                "aura": true
            }
        },
        "skill": {
            "name": "Valiant Charge",
            "description": "Markus charges forward, slamming into enemies and knocking them back.",
            "notes": "Staggers bosses",
            "cooldown": 30
        },
        "perks": [
            {
                "name": "Taal's Fortitude",
                "description": "Grant's an extra stamina shield.",
                "modifier": {
                    "type": "stamina",
                    "value": 2,
                    "conditional": false
                }
            },            
            {
                "name": "No Guts, No Glory",
                "description": "Reduces damage taken by 10%.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.1,
                    "conditional": false
                }
            }
        ],
        "talents": [
            {                
                "name": "Back Off, Ugly!",
                "description": "Staggering an enemy with a melee attack grants temporary health. Health gained is based on the strength of the stagger."
            },
            {                
                "name": "Bloody Unstoppable!",
                "description": "Striking multiple enemies in one swing grants temporary health based on the number of targets hit. Max 5 enemies."
            },
            {                
                "name": "Templar’s Rally",
                "description": "Healing yourself with a First Aid Kit or a Healing Draught also heals your nearby allies for 20% of their maximum health. Clears any wounds."
            },
            {                
                "name": "Staggering Force",
                "description": "Increases stagger power by 35%.",
                "modifier": {
                    "type": "stagger",
                    "value": 0.35,
                    "conditional": false
                }
            },
            {                
                "name": "Have at Thee!",
                "description": "Staggering an elite enemy increases power by 15% for 10 seconds.",
                "modifier": {
                    "type": "power",
                    "value": 0.15,
                    "conditional": true
                }
            },
            {                
                "name": "Crowd Clearer",
                "description": "Pushing an enemy increases attack speed by 15% for 3 seconds.",
                "modifier": {
                    "type": "attack_speed",
                    "value": 0.15,
                    "conditional": true
                }
            },
            {                
                "name": "Bulwark",
                "description": "Enemies that you stagger take 10% more damage from melee attacks for 5 seconds.\n\nDeal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 40% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Mainstay",
                "description": "Deal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 60% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Enhanced Power",
                "description": "Increases total Power Level by 7.5% (incorrect in-game). This is calculated before other buffs are applied.",
                "modifier": {
                    "type": "power",
                    "value": 0.07,
                    "conditional": false
                }
            },
            {                
                "name": "Rock of the Reikland",
                "description": "Protective Presence also grants 20% block cost reduction.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.2,
                    "conditional": false,
                    "aura": true
                }
            },
            {                
                "name": "Defensive Formation",
                "description": "Increases damage reduction from Protective Presence by 5%.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.05,
                    "conditional": false,
                    "aura": true
                }
            },
            {                
                "name": "Taal’s Champion",
                "description": "Increases power level by 10%. Removes damage reduction and no longer effects allies.",
                "modifier": {
                    "type": "power",
                    "value": 0.1,
                    "conditional": false
                }
            },
            {                
                "name": "It’s Hero Time",
                "description": "Increases movement speed by 30% when an ally is incapcitated.",
                "modifier": {
                    "type": "move_speed",
                    "value": 0.3,
                    "conditional": true
                }
            },
            {                
                "name": "Counter-Punch",
                "description": "Blocking an attack removes the stamina cost of pushing for 2 seconds."
            },
            {                
                "name": "That’s Bloody Teamwork!",
                "description": "Reduces damage taken by 5% for each nearby ally.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.05,
                    "conditional": true,
                    "stacks": 3
                }
            },
            {                
                "name": "Numb to Pain",
                "description": "Valiant Charge grants invulnerablility for 3 seconds.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 1.0,
                    "conditional": true
                }
            },
            {                
                "name": "Trample",
                "description": "Enemies hit by Valiant Charge takes 20% increased damage for 5 seconds. Does not stack with similar effects.",
                "modifier": {
                    "type": "enemy_damage",
                    "value": 0.2,
                    "conditional": true
                }
            },
            {                
                "name": "Bull of Ostland!",
                "description": "Each enemy hit with Valiant Charge grants 3% attack speed for 10 seconds. Stacks up to 10 times.",
                "modifier": {
                    "type": "attack_speed",
                    "value": 0.03,
                    "conditional": true,
                    "stacks": 10
                }
            }
        ]
    },
    {
        "id": 10,
        "name": "Witch Hunter Captain",
        "codeName": "wh_captain",
        "heroName": "Victor Saltzpyre",
        "health": 125,
        "passive": {
            "name": "Witch-Hunt",
            "description": "Tagged enemies take an additional 20% damage. Does not stack with similar effects.",
            "modifier": {
                "type": "power",
                "value": 0.2,
                "conditional": true
            }
        },
        "skill": {
            "name": "Animosity",
            "description": "Victor pushes back nearby enemies, and boosts nearby allies' critical hit chance by 25% for 6 seconds.",
            "notes": "Staggers bosses",
            "cooldown": 90,
            "modifier": {
                "type": "crit_chance",
                "value": 0.25,
                "conditional": true,
                "aura": true
            }
        },
        "perks": [
            {
                "name": "Eternal Guard",
                "description": "No light attack block cost from frontal attacks.",
                "modifier": {
                    "type": "block_reduction",
                    "value": 1,
                    "conditional": true
                }
            },
            {
                "name": "Killing Shot",
                "description": "Critical hit headshots instantly slay man-sized enemy."
            },
            {
                "name": "Power of Sigmar (unlisted)",
                "description": "Increases headshot bonus damage by 25%.",
                "modifier": {
                    "type": "headshot_power",
                    "value": 0.25,
                    "conditional": false
                }
            },
            {
                "name": "Sigmar's Charm (unlisted))",
                "description": "Increases critical strike chance by 5%.",
                "modifier": {
                    "type": "crit_chance",
                    "value": 0.05,
                    "conditional": false
                }
            }
        ],
        "talents": [
            {                
                "name": "Hunter’s Ardour",
                "description": "Melee critical strikes and headshots restore 2 temporary health. Critical headshots restores twice as much."
            },
            {                
                "name": "Walking Judgement",
                "description": "Damaging multiple enemies in one swing with a melee weapon grants temporary health. Max 5 enemies."
            },
            {                
                "name": "Disciplinarian",
                "description": "Healing yourself with a First Aid Kit or a Healing Draught also heals your nearby allies for 20% of their maximum health. Clears any wounds."
            },
            {                
                "name": "Riposte",
                "description": "Blocking just as an enemy attack is about to hit causes your next melee attack within 2 seconds to be a guaranteed critical hit.",
                "modifier": {
                    "type": "crit_chance",
                    "value": 1,
                    "conditional": true
                }
            },
            {                
                "name": "Deathknell",
                "description": "Increases headshot damage bonus by 50%.",
                "modifier": {
                    "type": "headshot_damage",
                    "value": 0.5,
                    "conditional": false
                }
            },
            {                
                "name": "Flense",
                "description": "Enemies hit by melee attacks bleed for extra damage."
            },
            {                
                "name": "Mainstay",
                "description": "Deal 40% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 60% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Assassin",
                "description": "Deal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Headshots and critical hits instead inflict 40% bonus damage, as do strikes against enemies afflicted by more than one stagger effect"
            },
            {                
                "name": "Enhanced Power",
                "description": "Increases total Power Level by 7.5% (incorrect in-game). This is calculated before other buffs are applied.",
                "modifier": {
                    "type": "power",
                    "value": 0.07,
                    "conditional": false
                }
            },
            {                
                "name": "Templar’s Knowledge",
                "description": "Witch Hunt causes enemies to take an additional 5% damage.",
                "modifier": {
                    "type": "power",
                    "value": 0.05,
                    "conditional": true
                }
            },
            {                
                "name": "Heretic Sighted",
                "description": "Tagging an enemy increases attack speed by 10% for 15 seconds.",
                "modifier": {
                    "type": "attack_speed",
                    "value": 0.1,
                    "conditional": true
                }
            },
            {                
                "name": "Wild Fervour",
                "description": "Witch-Hunt grants 5% increased critical hit chance to the entire party for 5 seconds when taggable enemies die.",
                "modifier": {
                    "type": "crit_chance",
                    "value": 0.05,
                    "conditional": true,
                    "aura": true
                }
            },
            {                
                "name": "Charmed Life",
                "description": "Increases dodge range by 20%.",
                "modifier": {
                    "type": "dodge_range",
                    "value": 0.2,
                    "conditional": false
                }
            },
            {                
                "name": "Cast Away",
                "description": "Pushing an enemy increases stamina regeneration by 40.0% for 2 seconds.",
                "modifier": {
                    "type": "stamina_regeneration",
                    "value": 0.4,
                    "conditional": true
                }
            },
            {                
                "name": "Always Prepared",
                "description": "Increases max ammunition by 30.0%.",
                "modifier": {
                    "type": "ammo_capacity",
                    "value": 0.3,
                    "conditional": false
                }
            },
            {                
                "name": "I Shall Judge You All!",
                "description": "Applies Witch Hunt to enemies hit by Animosity."
            },
            {                
                "name": "Fervency",
                "description": "Animosity grants Victor guaranteed melee critical strikes for the duration.",
                "modifier": {
                    "type": "crit_change",
                    "value": 1,
                    "conditional": true
                }
            },
            {                
                "name": "The Unending Hunt",
                "description": "Hitting 10 or more enemies with Animosity refunds 40% cooldown.",
                "modifier": {
                    "type": "cooldown_reduction",
                    "value": 0.4,
                    "conditional": true
                }
            }
        ]
    },
    {
        "id": 11,
        "name": "Bounty Hunter",
        "codeName": "wh_bountyhunter",
        "heroName": "Victor Saltzpyre",
        "health": 100,
        "passive": {
            "name": "Blessed Shots",
            "description": "Guaranteed ranged critical hit every 10 seconds.",
            "modifier": {
                "type": "crit_chance",
                "value": 1,
                "conditional": true
            }
        },
        "skill": {
            "name": "Locked and Loaded",
            "description": "Victor fires a powerful shot that pierces enemies.",
            "notes": "Staggers bosses",
            "cooldown": 70
        },
        "perks": [
            {
                "name": "Ammo Pouches",
                "description": "Increases ammo capacity by 50%.",
                "modifier": {
                    "type": "ammo_capacity",
                    "value": 0.5,
                    "conditional": false
                }
            },
            {
                "name": "Quick Release",
                "description": "Increased reload speed by 15%.",
                "modifier": {
                    "type": "reload_speed",
                    "value": 0.15,
                    "conditional": false
                }
            }
        ],
        "talents": [
            {                
                "name": "Blood for Money",
                "description": "Melee critical strikes and headshots grant 2 temporary health. Critical headshots restores twice as much."
            },
            {                
                "name": "Tithetaker",
                "description": "Melee killing blows restore temporary health based on the health of the slain enemy."
            },
            {                
                "name": "Paymaster",
                "description": "Healing yourself with a First Aid Kit or a Healing Draught also heals your nearby allies for 20% of their maximum health. Clears any wounds."
            },
            {                
                "name": "Open Wounds",
                "description": "Critical hits cause enemies to take 20.0% increased damage for a short duration. Does not stack with similar effects.",
                "modifier": {
                    "type": "power",
                    "value": 0.2,
                    "conditional": true,
                    "aura": true
                }
            },
            {                
                "name": "Steel Crescendo",
                "description": "Upon firing his last shot, Victor gains 15.0% attack speed and 15.0% power for 15 seconds.",
                "modifier": {
                    "type": "power",
                    "value": 0.25,
                    "conditional": true
                }
            },
            {                
                "name": "Weight of Fire",
                "description": "Ranged weapon magazine size increases ranged power level by 1.0% for each ammunition available.",
                "modifier": {
                    "type": "range_power",
                    "value": 0.01,
                    "conditional": true,
                    "stacks": 15
                }
            },
            {                
                "name": "Smiter",
                "description": "Deal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Headshots and critical hits instead inflict 40% bonus damage, as do strikes against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Assassin",
                "description": "The first enemy hit always counts as staggered.\n\nDeal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 40% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Enhanced Power",
                "description": "Increases total Power Level by 7.5% (incorrect in-game). This is calculated before other buffs are applied.",
                "modifier": {
                    "type": "power",
                    "value": 0.07,
                    "conditional": false
                }
            },
            {                
                "name": "Blessed Combat",
                "description": "Melee strikes make up to the next 6 ranged shots deal 15.0% more damage. Ranged hits makes up to the next 6 melee strikes deal 15.0% more damage. Melee kills reset the cooldown for Blessed Shots."
            },
            {                
                "name": "Cruel Fortune",
                "description": "Reduces cooldown on Blessed Shots to 6 seconds.",
                "modifier": {
                    "type": "passive_reduction",
                    "value": 6,
                    "conditional": false
                }
            },
            {                
                "name": "Prize Bounty",
                "description": "Shots affected by Blessed Shots consume no ammunition."
            },
            {                
                "name": "Rile the Mob",
                "description": "Ranged critical hits grant Victor and his allies 10.0% movement speed for 10 seconds.",
                "modifier": {
                    "type": "move_speed",
                    "value": 0.2,
                    "conditional": true
                }
            },
            {                
                "name": "Salvaged Ammunition",
                "description": "Killing an Elite while out of ammunition restores 20% of max ammunition. Melee kills reload Victor's ranged weapon."
            },
            {                
                "name": "Job Well Done",
                "description": "Killing an elite or special enemy grants 1.0% damage reduction buff, stacking up to 30 times. Lasts until end of level or death.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.01,
                    "conditional": false,
                    "stacks": 30
                }
            },
            {                
                "name": "Just Reward",
                "description": "Ranged critical hits reduce the cooldown of Locked and Loaded by 20.0%. Can only trigger once every 10 seconds."
            },
            {                
                "name": "Double-shotted",
                "description": "Modifies Victor’s sidearm to fire two powerful bullets in a straight line. Scoring a headshot with this attack reduces the cooldown of Locked and Loaded by 40 (Effect triggers twice, up to 80%).",
                "modifier": {
                    "type": "cooldown_reduction",
                    "value": 1,
                    "conditional": true
                }
            },
            {                
                "name": "Buckshot",
                "description": "Modifies Victor’s pistol to fire two blasts of shield-penetrating shot in a devestating cone. Each kill with the blast increases the amount of pellets in the next blast."
            }
        ]
    },
    {
        "id": 12,
        "name": "Zealot",
        "codeName": "wh_zealot",
        "heroName": "Victor Saltzpyre",
        "health": 150,
        "passive": {
            "name": "Fiery Faith",
            "description": "Power increases by 5% for every 25 health missing.",
            "modifier": {
                "type": "power",
                "value": 0.05,
                "conditional": true,
                "stacks": 6
            }
        },
        "skill": {
            "name": "Holy Fervour",
            "description": "Victor charges forward and gains 25% increased attack speed for 5 seconds.",
            "cooldown": 60
        },
        "perks": [
            {
                "name": "Unswerving Strikes",
                "description": "Heavy attacks can't be interrupted by damaging attacks."
            },
            {
                "name": "Heart of Iron",
                "description": "Resist death on taking lethal damage.",
                "notes": "Gain invulnerability for 5 seconds.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 1,
                    "conditional": true
                }
            }
        ],
        "talents": [
            {                
                "name": "Sigmar’s Herald",
                "description": "Damaging multiple enemies in one swing with a melee weapon grants temporary health. Max 5 enemies."
            },
            {                
                "name": "Repent! Repent!",
                "description": "Melee killing blows restore temporary health based on the health of the slain enemy."
            },
            {                
                "name": "Font of Zeal",
                "description": "Healing yourself with a First Aid Kit or a Healing Draught also heals your nearby allies for 20% of their maximum health. Clears any wounds."
            },
            {                
                "name": "Castigate",
                "description": "Increases attack speed by 10% while below 50% health. Double effect while below 20% health.",
                "modifier": {
                    "type": "attack_speed",
                    "value": 0.1,
                    "conditional": true,
                    "stacks": 2
                }
            },
            {                
                "name": "Smite",
                "description": "Every 5 hits grants a guaranteed critical strike. Critical strikes can no longer occur randomly."
            },
            {                
                "name": "Unbending Purpose",
                "description": "Increases power by 5%.",
                "modifier": {
                    "type": "power",
                    "value": 0.05,
                    "conditional": false
                }
            },
            {                
                "name": "Smiter",
                "description": "Deal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 60% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Mainstay",
                "description": "The first enemy hit always counts as staggered.\n\nDeal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 40% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Enhanced Power",
                "description": "Increases total Power Level by 7%. This is calculated before other buffs are applied.",
                "modifier": {
                    "type": "power",
                    "value": 0.07,
                    "conditional": false
                }
            },
            {                
                "name": "Crusade",
                "description": "Each stack of Fiery Faith also increases movement speed by 5%.",
                "modifier": {
                    "type": "move_speed",
                    "value": 0.05,
                    "conditional": true,
                    "stacks": 6
                }
            },
            {                
                "name": "Holy Fortitude",
                "description": "Each stack of Fiery Faith also increases healing recieved by 15%.",
                "modifier": {
                    "type": "health_boon",
                    "value": 0.15,
                    "conditional": true,
                    "stacks": 6
                }
            },
            {                
                "name": "Armour of Faith",
                "description": "Each stack of Fiery Faith also reduces damage taken by 5%.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.05,
                    "conditional": true,
                    "stacks": 6
                }
            },
            {                
                "name": "Devotion",
                "description": "Taking damage increases movement speed by 30% for 2 seconds. Getting attacked no longer slows movement speed.",
                "modifier": {
                    "type": "move_speed",
                    "value": 0.3,
                    "conditional": true
                }
            },
            {                
                "name": "Redemption through Blood",
                "description": "Taking damage restores stamina to full."
            },
            {                
                "name": "Calloused Without and Within",
                "description": "Damage taken reduced by 10%.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.1,
                    "conditional": false
                }
            },
            {                
                "name": "Faith’s Flurry",
                "description": "Attacks during Holy Fervour increases power by 2% for 5 seconds. Stacks up to 10 times.",
                "modifier": {
                    "type": "power",
                    "value": 0.05,
                    "conditional": true,
                    "stacks": 6
                }
            },
            {                
                "name": "Feel Nothing",
                "description": "Health can’t be reduced below 1 for the duration of Holy Fervour."
            },
            {                
                "name": "Flagellant’s Zeal",
                "description": "Each hit during Holy Fervour grants a stack up to 10. Each stack reduces the cooldown of Holy Fervour by 5% when the buff fades."
            }
        ]
    },
    {
        "id": 19,
        "name": "Foot Knight",
        "codeName": "es_knight",
        "heroName": "Markus Kruber",
        "health": 150,
        "passive": {
            "name": "Protective Presence",
            "description": "Aura that reduces damage taken by 15%.",
            "modifier": {
                "type": "damage_reduction",
                "value": 0.15,
                "conditional": false,
                "aura": true
            }
        },
        "skill": {
            "name": "Valiant Charge",
            "description": "Markus charges forward, slamming into enemies and knocking them back.",
            "notes": "Staggers bosses",
            "cooldown": 30
        },
        "perks": [
            {
                "name": "Taal's Fortitude",
                "description": "Grant's an extra stamina shield.",
                "modifier": {
                    "type": "stamina",
                    "value": 2,
                    "conditional": false
                }
            },            
            {
                "name": "No Guts, No Glory",
                "description": "Reduces damage taken by 10%.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.1,
                    "conditional": false
                }
            }
        ],
        "talents": [
            {                
                "name": "Back Off, Ugly!",
                "description": "Staggering an enemy with a melee attack grants temporary health. Health gained is based on the strength of the stagger."
            },
            {                
                "name": "Bloody Unstoppable!",
                "description": "Striking multiple enemies in one swing grants temporary health based on the number of targets hit. Max 5 enemies."
            },
            {                
                "name": "Templar’s Rally",
                "description": "Healing yourself with a First Aid Kit or a Healing Draught also heals your nearby allies for 20% of their maximum health. Clears any wounds."
            },
            {                
                "name": "Staggering Force",
                "description": "Increases stagger power by 35%.",
                "modifier": {
                    "type": "stagger",
                    "value": 0.35,
                    "conditional": false
                }
            },
            {                
                "name": "Have at Thee!",
                "description": "Staggering an elite enemy increases power by 15% for 10 seconds.",
                "modifier": {
                    "type": "power",
                    "value": 0.15,
                    "conditional": true
                }
            },
            {                
                "name": "Crowd Clearer",
                "description": "Pushing an enemy increases attack speed by 15% for 3 seconds.",
                "modifier": {
                    "type": "attack_speed",
                    "value": 0.15,
                    "conditional": true
                }
            },
            {                
                "name": "Bulwark",
                "description": "Enemies that you stagger take 10% more damage from melee attacks for 5 seconds.\n\nDeal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 40% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Mainstay",
                "description": "Deal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 60% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Enhanced Power",
                "description": "Increases total Power Level by 7.5% (incorrect in-game). This is calculated before other buffs are applied.",
                "modifier": {
                    "type": "power",
                    "value": 0.07,
                    "conditional": false
                }
            },
            {                
                "name": "Rock of the Reikland",
                "description": "Protective Presence also grants 20% block cost reduction.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.2,
                    "conditional": false,
                    "aura": true
                }
            },
            {                
                "name": "Defensive Formation",
                "description": "Increases damage reduction from Protective Presence by 5%.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.05,
                    "conditional": false,
                    "aura": true
                }
            },
            {                
                "name": "Taal’s Champion",
                "description": "Increases power level by 10%. Removes damage reduction and no longer effects allies.",
                "modifier": {
                    "type": "power",
                    "value": 0.1,
                    "conditional": false
                }
            },
            {                
                "name": "It’s Hero Time",
                "description": "Increases movement speed by 30% when an ally is incapcitated.",
                "modifier": {
                    "type": "move_speed",
                    "value": 0.3,
                    "conditional": true
                }
            },
            {                
                "name": "Counter-Punch",
                "description": "Blocking an attack removes the stamina cost of pushing for 2 seconds."
            },
            {                
                "name": "That’s Bloody Teamwork!",
                "description": "Reduces damage taken by 5% for each nearby ally.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.05,
                    "conditional": true,
                    "stacks": 3
                }
            },
            {                
                "name": "Numb to Pain",
                "description": "Valiant Charge grants invulnerablility for 3 seconds.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 1.0,
                    "conditional": true
                }
            },
            {                
                "name": "Trample",
                "description": "Enemies hit by Valiant Charge takes 20% increased damage for 5 seconds. Does not stack with similar effects.",
                "modifier": {
                    "type": "enemy_damage",
                    "value": 0.2,
                    "conditional": true
                }
            },
            {                
                "name": "Bull of Ostland!",
                "description": "Each enemy hit with Valiant Charge grants 3% attack speed for 10 seconds. Stacks up to 10 times.",
                "modifier": {
                    "type": "attack_speed",
                    "value": 0.03,
                    "conditional": true,
                    "stacks": 10
                }
            }
        ]
    },
    {
        "id": 13,
        "name": "Battle Wizard",
        "codeName": "bw_scholar",
        "heroName": "Sienna Fuegonasus",
        "health": 100,
        "passive": {
            "name": "Tranquility",
            "description": "After not casting spells for 6 seconds, automatically ventilates Overcharge."
        },
        "skill": {
            "name": "Fire Walk",
            "description": "Sienna teleports forward, leaving a blanket of fire in her wake that lingers for 6 seconds.",
            "notes": "Staggers bosses",
            "cooldown": 40
        },
        "perks": [
            {
                "name": "Reckless Haste",
                "description": "Overcharge increases spell charge speed by up to 30%.",
                "modifier": {
                    "type": "range_charge_speed",
                    "value": 0.06,
                    "conditional": true,
                    "stacks": 5
                }
            },
            {
                "name": "Pyromantic Surge",
                "description": "Increased range damage by 10%.",
                "modifier": {
                    "type": "range_power",
                    "value": 0.1,
                    "conditional": false
                }
            }
        ],
        "talents": [
            {                
                "name": "Confound",
                "description": "Staggering enemies with a melee attack grants temporary health. Health gained based stagger strength."
            },
            {                
                "name": "Spark Thief",
                "description": "Melee killing blows restore temporary health based on the health of the slain enemy."
            },
            {                
                "name": "Flame-Fettled",
                "description": "Healing yourself with a First Aid Kit or a Healing Draught also heals your nearby allies for 20% of their maximum health. Clears any wounds."
            },
            {                
                "name": "Volcanic Force",
                "description": "Fully charging spells increases its power by 50%."
            },
            {                
                "name": "Famished Flames",
                "description": "Burning damage over time is increased by 150%. All non-burn damage is reduced by 30%."
            },
            {                
                "name": "Lingering Flames",
                "description": "Sienna’s burning effects now last until the effected enemy dies. Burning effects does not stack."
            },
            {                
                "name": "Bulwark",
                "description": "Enemies that you stagger take 10% more damage from melee attacks for 5 seconds.\n\nDeal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 40% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Smiter",
                "description": "The first enemy hit always counts as staggered.\n\nDeal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 40% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Enhanced Power",
                "description": "Increases total Power Level by 7.5% (incorrect in-game). This is calculated before other buffs are applied."
            },
            {                
                "name": "Unusually Calm",
                "description": "Tranquility cooldown is reduced to 3 seconds."
            },
            {                
                "name": "Rechannel",
                "description": "When Tranquillity is active, Sienna’s ranged charge time is reduced by 40%."
            },
            {                
                "name": "Centred",
                "description": "Increases the venting effect of Tranquillity by 100%."
            },
            {                
                "name": "Soot Shield",
                "description": "Igniting an enemy (dead or alive) reduces damage taken by 10% for 5 seconds. Stacks up to 3 times."
            },
            {                
                "name": "Fires from Ash",
                "description": "Killing a burning enemy reduces the cooldown of Fire Walk by 3%."
            },
            {                
                "name": "Immersive Immolation",
                "description": "Hitting 4 or more enemies with one attack grants 15% increased attack speed for 5 seconds."
            },
            {                
                "name": "Volans' Quickening",
                "description": "Reduces the cooldown of Fire Walk by 30%."
            },
            {                
                "name": "Kaboom!",
                "description": "Fire Walk explosion radius and damage increased. No longer leaves a burning trail."
            },
            {                
                "name": "Burnout",
                "description": "Fire Walk can be activated a second time within 10 seconds."
            }
        ]
    },
    {
        "id": 14,
        "name": "Pyromancer",
        "codeName": "bw_adept",
        "heroName": "Sienna Fuegonasus",
        "health": 100,
        "passive": {
            "name": "Critical Mass",
            "description": "Increased critical strike chance based on Overcharge level up to 30%.",
            "modifier": {
                "type": "crit_chance",
                "value": 0.06,
                "conditional": true,
                "stacks": 5
            }
        },
        "skill": {
            "name": "The Burning Head",
            "description": "Sienna unleashes a fiery projectile that seeks out foes.",
            "notes": "Staggers bosses",
            "cooldown": 60
        },
        "perks": [
            {
                "name": "Searing Focus",
                "description": "Increased ranged damage by 10%.",
                "modifier": {
                    "type": "range_power",
                    "value": 0.1,
                    "conditional": false
                }
            }
        ],
        "talents": [
            {                
                "name": "Spark Smith",
                "description": "Damaging multiple enemies in one swing with a melee weapon grants temporary health. Max 5 enemies."
            },
            {                
                "name": "Spirit-Binding",
                "description": "Melee killing blows restore temporary health based on the health of the slain enemy."
            },
            {                
                "name": "Fiery Fortitude",
                "description": "Healing yourself with a First Aid Kit or a Healing Draught also heals your nearby allies for 20% of their maximum health. Clears any wounds."
            },
            {                
                "name": "Ride the Fire Wind",
                "description": "Increases ranged power level by 1% every second up to a maximum of 20 stacks. Upon reaching maximum stacks effect diminishes then starts over."
            },
            {                
                "name": "Martial Study",
                "description": "Increases attack speed by 5%."
            },
            {                
                "name": "Spirit-Casting",
                "description": "Increases critical strike chance by 10% while above 80% health."
            },
            {                
                "name": "Smiter",
                "description": "The first enemy hit always counts as staggered.\n\nDeal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 40% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Mainstay",
                "description": "Deal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 60% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Enhanced Power",
                "description": "Increases total Power Level by 7.5% (incorrect in-game). This is calculated before other buffs are applied."
            },
            {                
                "name": "Deathly Dissipation",
                "description": "Killing a special stops your spells from generating overcharge for 10 seconds."
            },
            {                
                "name": "On the Precipice",
                "description": "Increases ranged power by 15% when at or above critical overcharge."
            },
            {                
                "name": "One with the Flame",
                "description": "Critical Mass also increases attack speed by 2% per 6 overcharge and stacks up to 5 times."
            },
            {                
                "name": "Soul Siphon",
                "description": "Reduces damage taken by 10% for 10 seconds after killing a special or elite enemy. Stacks up to 3 times. \n\n(incorrect in-game)"
            },
            {                
                "name": "The Volans Doctrine",
                "description": "No longer slowed from being overcharged."
            },
            {                
                "name": "Fleetflame",
                "description": "Critical hits increase movement speed by 5.0% for 10 seconds. Stacks up to 3 times."
            },
            {                
                "name": "Exhaust",
                "description": "The Burning Head also removes all overcharge."
            },
            {                
                "name": "Bonded Flame",
                "description": "The Burning Head grants 35 temporary health when used."
            },
            {                
                "name": "Blazing Echo",
                "description": "The Burning Head critical hits refunds its cooldown."
            }
        ]
    },
    {
        "id": 15,
        "name": "Unchained",
        "codeName": "bw_unchained",
        "heroName": "Sienna Fuegonasus",
        "health": 150,
        "passive": {
            "name": "Blood Magic",
            "description": "50% damage taken transferred to Overcharge.",
            "modifier": {
                "type": "damage_reduction",
                "value": 0.5,
                "conditional": false
            }
        },
        "skill": {
            "name": "Living Bomb",
            "description": "Sienna explodes, dealing damage to surrounding enemies and clearing her Overcharge.",
            "cooldown": 120
        },
        "perks": [
            {
                "name": "Slave to Aqshy",
                "description": "No Overcharge slowdown."
            },
            {
                "name": "Unstable Strength",
                "description": "Increased melee power on high Overcharge by up to 60%.",
                "modifier": {
                    "type": "melee_power",
                    "value": 0.1,
                    "conditional": false,
                    "stacks": 6
                }
            }
        ],
        "talents": [
            {                
                "name": "Soul Quench",
                "description": "Staggering enemies with a melee attack grants temporary health. Health gained based stagger strength."
            },
            {                
                "name": "Reckless Rampage",
                "description": "Damaging multiple enemies in one swing with a melee weapon grants temporary health. Max 5 enemies."
            },
            {                
                "name": "Burn-Bloom",
                "description": "Healing yourself with a First Aid Kit or a Healing Draught also heals your nearby allies for 20% of their maximum health. Clears any wounds."
            },
            {                
                "name": "Frenzied Flame",
                "description": "Increases attack speed by 15% while at or above high Overcharge."
            },
            {                
                "name": "Outburst",
                "description": "Pushing an enemy ignites them, causing damage over time. Heavy attacks makes the next push arc 70.0% wider."
            },
            {                
                "name": "Chain Reaction",
                "description": "Burning enemies have a small chance to explode on death."
            },
            {                
                "name": "Bulwark",
                "description": "Enemies that you stagger take 10% more damage from melee attacks for 5 seconds.\n\nDeal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 40% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Mainstay",
                "description": "Deal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 60% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Enhanced Power",
                "description": "Increases total Power Level by 7.5% (incorrect in-game). This is calculated before other buffs are applied."
            },
            {                
                "name": "Dissipate",
                "description": "Block cost is reduced by 50% when Overcharged and blocking attacks vent Overcharge."
            },
            {                
                "name": "Conduit",
                "description": "Increases rate of venting overcharge by 30% and reduces damage taken from venting by 50%."
            },
            {                
                "name": "Numb to Pain",
                "description": "Reduces damage taken by 5.0% and overcharge generated by Blood Magic by 16.6% for 15 seconds after venting. Stacks 3 times."
            },
            {                
                "name": "Enfeebling Flames",
                "description": "Burning enemies deal 30% less damage."
            },
            {                
                "name": "Abandon",
                "description": "During overcharge, Sienna expends health to increase ability cooldown rate."
            },
            {                
                "name": "Natural Talent",
                "description": "Reduces overcharge generated by 10%."
            },
            {                
                "name": "Fuel for the Fire",
                "description": "Each enemy hit by Living Bomb increases power by 5.0% for 10 seconds. Stacks up to 5 times."
            },
            {                
                "name": "Wildfire",
                "description": "Living Bomb grants Sienna a scorching aura that ignites nearby enemies for 10 seconds, causing damage over time. Increases the stagger power of Living Bomb."
            },
            {                
                "name": "Bomb Balm",
                "description": "Living Bomb restores 30 temporary health to allies."
            }
        ]
    }, {
        "id": 20,
        "name": "Foot Knight",
        "codeName": "es_knight",
        "heroName": "Markus Kruber",
        "health": 150,
        "passive": {
            "name": "Protective Presence",
            "description": "Aura that reduces damage taken by 15%.",
            "modifier": {
                "type": "damage_reduction",
                "value": 0.15,
                "conditional": false,
                "aura": true
            }
        },
        "skill": {
            "name": "Valiant Charge",
            "description": "Markus charges forward, slamming into enemies and knocking them back.",
            "notes": "Staggers bosses",
            "cooldown": 30
        },
        "perks": [
            {
                "name": "Taal's Fortitude",
                "description": "Grant's an extra stamina shield.",
                "modifier": {
                    "type": "stamina",
                    "value": 2,
                    "conditional": false
                }
            },            
            {
                "name": "No Guts, No Glory",
                "description": "Reduces damage taken by 10%.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.1,
                    "conditional": false
                }
            }
        ],
        "talents": [
            {                
                "name": "Back Off, Ugly!",
                "description": "Staggering an enemy with a melee attack grants temporary health. Health gained is based on the strength of the stagger."
            },
            {                
                "name": "Bloody Unstoppable!",
                "description": "Striking multiple enemies in one swing grants temporary health based on the number of targets hit. Max 5 enemies."
            },
            {                
                "name": "Templar’s Rally",
                "description": "Healing yourself with a First Aid Kit or a Healing Draught also heals your nearby allies for 20% of their maximum health. Clears any wounds."
            },
            {                
                "name": "Staggering Force",
                "description": "Increases stagger power by 35%.",
                "modifier": {
                    "type": "stagger",
                    "value": 0.35,
                    "conditional": false
                }
            },
            {                
                "name": "Have at Thee!",
                "description": "Staggering an elite enemy increases power by 15% for 10 seconds.",
                "modifier": {
                    "type": "power",
                    "value": 0.15,
                    "conditional": true
                }
            },
            {                
                "name": "Crowd Clearer",
                "description": "Pushing an enemy increases attack speed by 15% for 3 seconds.",
                "modifier": {
                    "type": "attack_speed",
                    "value": 0.15,
                    "conditional": true
                }
            },
            {                
                "name": "Bulwark",
                "description": "Enemies that you stagger take 10% more damage from melee attacks for 5 seconds.\n\nDeal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 40% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Mainstay",
                "description": "Deal 20% more damage to staggered enemies. Each hit against a staggered enemy adds another count of stagger. Bonus damage is increased to 60% against enemies afflicted by more than one stagger effect."
            },
            {                
                "name": "Enhanced Power",
                "description": "Increases total Power Level by 7.5% (incorrect in-game). This is calculated before other buffs are applied.",
                "modifier": {
                    "type": "power",
                    "value": 0.07,
                    "conditional": false
                }
            },
            {                
                "name": "Rock of the Reikland",
                "description": "Protective Presence also grants 20% block cost reduction.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.2,
                    "conditional": false,
                    "aura": true
                }
            },
            {                
                "name": "Defensive Formation",
                "description": "Increases damage reduction from Protective Presence by 5%.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.05,
                    "conditional": false,
                    "aura": true
                }
            },
            {                
                "name": "Taal’s Champion",
                "description": "Increases power level by 10%. Removes damage reduction and no longer effects allies.",
                "modifier": {
                    "type": "power",
                    "value": 0.1,
                    "conditional": false
                }
            },
            {                
                "name": "It’s Hero Time",
                "description": "Increases movement speed by 30% when an ally is incapcitated.",
                "modifier": {
                    "type": "move_speed",
                    "value": 0.3,
                    "conditional": true
                }
            },
            {                
                "name": "Counter-Punch",
                "description": "Blocking an attack removes the stamina cost of pushing for 2 seconds."
            },
            {                
                "name": "That’s Bloody Teamwork!",
                "description": "Reduces damage taken by 5% for each nearby ally.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 0.05,
                    "conditional": true,
                    "stacks": 3
                }
            },
            {                
                "name": "Numb to Pain",
                "description": "Valiant Charge grants invulnerablility for 3 seconds.",
                "modifier": {
                    "type": "damage_reduction",
                    "value": 1.0,
                    "conditional": true
                }
            },
            {                
                "name": "Trample",
                "description": "Enemies hit by Valiant Charge takes 20% increased damage for 5 seconds. Does not stack with similar effects.",
                "modifier": {
                    "type": "enemy_damage",
                    "value": 0.2,
                    "conditional": true
                }
            },
            {                
                "name": "Bull of Ostland!",
                "description": "Each enemy hit with Valiant Charge grants 3% attack speed for 10 seconds. Stacks up to 10 times.",
                "modifier": {
                    "type": "attack_speed",
                    "value": 0.03,
                    "conditional": true,
                    "stacks": 10
                }
            }
        ]
    }
]
