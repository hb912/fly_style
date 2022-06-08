import { Router } from "express";

// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { categoryService } from "../services";

const categoryRouter = Router();

//카테고리 등록 (login 확인, admin 확인)
categoryRouter.post(
  "/",
  async (req, res, next) => {
    try {
      const { name } = req.body;

      const newCategory = await categoryService.addCategory({ name });

      res.json(newCategory);
    } catch (err) {
      next(err);
    }
  }
);

//카테고리 목록
categoryRouter.get("/", async (req, res) => {
  const categoryList = await categoryService.categoryList();

  res.json(categoryList);
});

//카테고리 수정 (login 확인, admin 확인)
categoryRouter.patch("/:id", async (req, res) => {
  const categoryId = req.params.id;

  const { name } = req.body;

  const updateData = {
    name,
  };

  const editCategory = await categoryService.editCategory(categoryId, updateData);

  res.json(editCategory);
});

//카테고리 삭제 (login 확인, admin 확인)
categoryRouter.delete(
  "/:id",
  async (req, res) => {
    const categoryId = req.params.id;

    await categoryService.deleteCategory(categoryId);

    res.send(`카테고리를 삭제했습니다.`);
    // res.redirect("/api/category");
  }
);

export { categoryRouter };
