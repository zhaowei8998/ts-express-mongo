-- `weilun-financial`.`action` definition
CREATE TABLE `action` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `menuId` int(11) DEFAULT NULL COMMENT '菜单Id',
    `operate` varchar(50) DEFAULT NULL COMMENT '操作名称',
    `isRestrict` tinyint(4) DEFAULT '0' COMMENT '创建角色时是否是受限制的',
    `created` datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`) USING BTREE,
    KEY `idx_action_menuId` (`menuId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '菜单的操作';