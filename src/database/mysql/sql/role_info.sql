-- `weilun-financial`.role_info definition
CREATE TABLE `role_info` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(100) DEFAULT NULL COMMENT '角色名称',
    `description` varchar(200) DEFAULT NULL COMMENT '角色说明',
    `status` tinyint(4) DEFAULT NULL COMMENT '状态，1：启用，2：禁用，3：删除',
    `actionIds` varchar(1000) DEFAULT NULL COMMENT '可见的操作Id，多个用,分隔',
    `created` datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COMMENT = '角色';