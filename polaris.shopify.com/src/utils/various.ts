import { NavItem } from "../components/Nav/Nav";
import components from "../data/components.json";

export const getComponentCategories = (): string[] => {
  const tempComponentCategories: { [key: string]: boolean } = {};

  Object.values(components).forEach((component) => {
    tempComponentCategories[component.frontMatter.category] = true;
  });

  const componentCategories = Object.keys(tempComponentCategories);

  return componentCategories;
};

export const slugify = (str: string) => {
  return str.toLowerCase().replace(/[^a-z0-9]/gi, "-");
};

export const stripMarkdownLinks = (markdown: string): string => {
  const linkRegex = /\[([a-z ]+)\]([^\)]+)\)/gi;
  return markdown.replaceAll(linkRegex, (_, linkText) => {
    return linkText;
  });
};

export const getUrlsFromNavItems = (navItems: NavItem[]): string[] => {
  let urls: string[] = [];

  navItems.forEach((navItem) => {
    if (navItem.url) {
      urls.push(navItem.url);
    }
    if (navItem.children) {
      urls = [...urls, ...getUrlsFromNavItems(navItem.children)];
    }
  });

  return urls;
};