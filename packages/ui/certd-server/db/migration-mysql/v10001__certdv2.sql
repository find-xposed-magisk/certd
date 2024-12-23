CREATE TABLE `pi_history` (`id` bigint PRIMARY KEY AUTO_INCREMENT NOT NULL, `user_id` bigint NOT NULL, `pipeline_id` bigint NOT NULL, `pipeline` TEXT, `status` varchar(20), `end_time` timestamp, `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE `pi_history_log` (`id` bigint PRIMARY KEY AUTO_INCREMENT NOT NULL, `user_id` bigint NOT NULL, `pipeline_id` bigint NOT NULL, `history_id` bigint NOT NULL, `node_id` varchar(100), `logs` TEXT, `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE `pi_pipeline` (`id` bigint PRIMARY KEY AUTO_INCREMENT NOT NULL, `user_id` bigint NOT NULL, `title` varchar(200) NOT NULL, `content` TEXT NOT NULL, `keep_history_count` bigint, `remark` varchar(100), `status` varchar(100), `disabled` boolean DEFAULT 0, `last_history_time` bigint, `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE `pi_storage` (`id` bigint PRIMARY KEY AUTO_INCREMENT NOT NULL, `user_id` bigint NOT NULL, `scope` varchar(100) NOT NULL, `namespace` varchar(100) NOT NULL, `version` varchar(100),`key` varchar(100), `value` TEXT, `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP);