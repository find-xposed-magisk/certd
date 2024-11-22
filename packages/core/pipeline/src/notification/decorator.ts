// src/decorator/memoryCache.decorator.ts
import { Decorator } from "../decorator/index.js";
import * as _ from "lodash-es";
import { notificationRegistry } from "./registry.js";
import { http, logger, utils } from "@certd/basic";
import { NotificationContext, NotificationDefine, NotificationInputDefine } from "./api.js";

// 提供一个唯一 key
export const NOTIFICATION_CLASS_KEY = "pipeline:notification";
export const NOTIFICATION_INPUT_KEY = "pipeline:notification:input";

export function IsNotification(define: NotificationDefine): ClassDecorator {
  return (target: any) => {
    target = Decorator.target(target);

    const inputs: any = {};
    const properties = Decorator.getClassProperties(target);
    for (const property in properties) {
      const input = Reflect.getMetadata(NOTIFICATION_INPUT_KEY, target, property);
      if (input) {
        inputs[property] = input;
      }
    }
    _.merge(define, { input: inputs });
    Reflect.defineMetadata(NOTIFICATION_CLASS_KEY, define, target);
    target.define = define;
    notificationRegistry.register(define.name, {
      define,
      target,
    });
  };
}

export function NotificationInput(input?: NotificationInputDefine): PropertyDecorator {
  return (target, propertyKey) => {
    target = Decorator.target(target, propertyKey);
    // const _type = Reflect.getMetadata("design:type", target, propertyKey);
    Reflect.defineMetadata(NOTIFICATION_INPUT_KEY, input, target, propertyKey);
  };
}

export function newNotification(type: string, input: any, ctx?: NotificationContext) {
  const register = notificationRegistry.get(type);
  if (register == null) {
    throw new Error(`notification ${type} not found`);
  }
  // @ts-ignore
  const access = new register.target();
  for (const key in input) {
    access[key] = input[key];
  }
  if (!ctx) {
    ctx = {
      http,
      logger,
      utils,
    };
  }
  access.ctx = ctx;
  return access;
}
